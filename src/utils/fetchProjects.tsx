import axios from 'axios';
import { GitHubResponse, Project } from '@/types/GitHubProjects';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) throw new Error('Missing GITHUB_TOKEN environment variable.');

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
});

const GITHUB_QUERY = `
  query {
    viewer {
      repositories(orderBy: {field: CREATED_AT, direction: DESC}, first: 24, affiliations: [OWNER, COLLABORATOR], privacy: PUBLIC) {
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

export const fetchProjects = async () => {
  const { data } = await axiosInstance.post<GitHubResponse>('', { query: GITHUB_QUERY });
  const projects: Project[] = data.data.viewer.repositories.nodes.map((repo) => ({
    name: repo.name,
    description: repo.description,
    language: repo.primaryLanguage?.name || null,
    tags: repo.repositoryTopics.nodes.map((node) => node.topic.name),
    stars: repo.stargazers.totalCount,
    liveUrl: repo.homepageUrl || undefined,
    sourceUrl: repo.url,
  }));

  return projects;
};
