export const dynamic = "force-dynamic";

import { GitHubResponse, Project, RepoNode } from "@/types/GitHubProjects";
import ProjectCard from "@/components/projects/ProjectCard";
import styles from "@/styles/pages/ProjectsPage.module.css";

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

async function getProjects(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Missing GITHUB_TOKEN");

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "my-portfolio" },
    body: JSON.stringify({ query: GITHUB_QUERY }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`GitHub fetch failed: ${res.status} ${txt}`);
  }

  const json = (await res.json()) as GitHubResponse;
  const nodes: RepoNode[] = json?.data?.viewer?.repositories?.nodes ?? [];

  const projects: Project[] = nodes.map((repo) => {
    const tags = (repo.repositoryTopics?.nodes ?? [])
      .map((n) => n?.topic?.name)
      .filter((t): t is string => Boolean(t));

    return {
      name: repo.name,
      description: repo.description,
      language: repo.primaryLanguage?.name ?? null,
      tags,
      stars: repo.stargazers?.totalCount ?? 0,
      liveUrl: repo.homepageUrl ?? undefined,
      sourceUrl: repo.url,
    } as Project;
  });

  return projects;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className={styles.projectsPage}>
      <div className={styles.grid}>
        {projects.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
    </div>
  );
}
