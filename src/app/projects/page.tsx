'use client';

import React, { useEffect, useState } from 'react';
import { fetchProjects } from '@/services/fetchProjects';
import { Project } from '@/types/GitHubProjects';
import ProjectCard from '@/components/projects/ProjectCard';
import styles from '@/styles/pages/ProjectsPage.module.css';

const ProjectsPage: React.FC = () => {
  const [state, setState] = useState<{
    projects: Project[];
    loading: boolean;
    error: string | null;
  }>({ projects: [], loading: true, error: null });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await fetchProjects();
        setState({ projects, loading: false, error: null });
      } catch (err) {
        setState({ projects: [], loading: false, error: 'Failed to load projects. Please try again later.' });
        console.error(err);
      }
    };
    loadProjects();
  }, []);

  if (state.loading) return <p>Loading projects...</p>;
  if (state.error) return <p>{state.error}</p>;

  return (
    <div style={{ width: '100%', maxWidth: '100vw', margin: '0 auto' }}>
      <div className={styles.grid}>
      {state.projects.map((project) => (
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

export default ProjectsPage;
