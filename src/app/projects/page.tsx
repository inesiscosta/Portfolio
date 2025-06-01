import React from 'react';
import { Project } from '@/types/GitHubProjects';
import { fetchProjects } from '@/utils/fetchProjects';
import ProjectCard from '@/components/projects/ProjectCard';
import styles from '@/styles/pages/ProjectsPage.module.css';

export default async function ProjectsPage() {
  const projects: Project[] = await fetchProjects();

  return (
    <div className={styles.projectsPage}>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.description}
            language={project.language}
            tags={project.tags}
            stars={project.stars}
            sourceUrl={project.sourceUrl}
            liveUrl={project.liveUrl}
          />
        ))}
      </div>
    </div>
  );
}
