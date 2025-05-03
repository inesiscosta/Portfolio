import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) throw new Error('Missing GITHUB_TOKEN environment variable.');

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
});

const GITHUB_QUERY = `
  query {
    viewer {
      repositories(orderBy: {field: CREATED_AT, direction: DESC}, first: 25, affiliations: [OWNER, COLLABORATOR], privacy: PUBLIC) {
        nodes {
          name
          description
          homepageUrl
          stargazers { totalCount }
          repositoryTopics(first: 10) { nodes { topic { name } } }
          primaryLanguage { name }
          url
        }
      }
    }
  }
`;

interface GitHubResponse {
  data: {
    viewer: {
      repositories: {
        nodes: {
          name: string;
          description: string | null;
          homepageUrl: string | null;
          stargazers: { totalCount: number };
          repositoryTopics: { nodes: { topic: { name: string } }[] };
          primaryLanguage: { name: string } | null;
          url: string;
        }[];
      };
    };
  };
}

export const fetchProjects = async () => {
  try {
    const cachedDate = sessionStorage.getItem('github-projects');
    if (cachedDate) {
      return JSON.parse(cachedDate);
    }
    const { data } = await axiosInstance.post<GitHubResponse>('', { query: GITHUB_QUERY });
    const projects =  data.data.viewer.repositories.nodes.map((repo) => ({
      name: repo.name,
      description: repo.description,
      homepageUrl: repo.homepageUrl,
      stars: repo.stargazers.totalCount,
      topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
      language: repo.primaryLanguage?.name || null,
      sourceUrl: repo.url,
    }));
    sessionStorage.setItem('github-projects', JSON.stringify(projects));
    return projects;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : 'An unexpected error occurred';
    throw new Error(`Failed to fetch projects: ${errorMessage}`);
  }
};
