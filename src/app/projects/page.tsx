import React from 'react';
import { fetchProjects } from '@/utils/fetchProjects';
import { Project } from '@/types/GitHubProjects';
import ProjectCard from '@/components/projects/ProjectCard';
import styles from '@/styles/pages/ProjectsPage.module.css';

const ProjectsPage = async () => {
  try {
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
  } catch (error) {
    console.error(error);
    return <p>Failed to load projects. Please try again later.</p>;
  }
};

export default ProjectsPage;
