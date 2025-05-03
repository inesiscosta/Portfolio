export interface GitHubResponse {
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

export interface Project {
  name: string;
  description: string | null;
  language: string | null;
  tags: string[];
  stars: number;
  liveUrl?: string;
  sourceUrl: string;
}
