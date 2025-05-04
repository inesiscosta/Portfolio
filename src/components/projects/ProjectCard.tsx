import React from 'react';
import Image from 'next/image';
import { FaStar, FaGithub } from 'react-icons/fa';
import { BsGlobe2 } from "react-icons/bs";
import GitHub from '@/assets/github.svg';
import languageIcons from '@/utils/languageIcons';
import { Project } from '@/types/GitHubProjects';
import styles from '@/styles/components/projects/ProjectCard.module.css';

const ProjectCard: React.FC<Project> = ({ name, description, language, tags,
  stars, sourceUrl, liveUrl }) => {
  const languageIconUrl = language ? languageIcons[language.toLowerCase()] : undefined;
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.stars}>
          <FaStar className={styles.starIcon}/>
          <span>{stars}</span>
        </div>
      </div>
      <p className={styles.description}>{description || 'No description available.'}</p>
      <div className={styles.info}>
        <div className={styles.language}>
          <div className={styles.languageIcon}>
            <Image
            src={languageIconUrl || GitHub} 
            alt={language ? `Written in ${language}` : ''} 
            />
          </div>
          <span>{language || ''}</span>
        </div>
        <div className={styles.tags}>
            {tags?.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
            ))}
        </div>
      </div>
      <div className={styles.cta}>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className={`${styles.ctaButton} ${styles.github}`}>
          <FaGithub className={styles.ctaIcon}/> Source
        </a>
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.ctaButton} ${styles.visit}`}>
            <BsGlobe2 className={styles.ctaIcon}/> Visit
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
