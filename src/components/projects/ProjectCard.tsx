import React from 'react';
import Image from 'next/image';
import { FaStar, FaGithub } from 'react-icons/fa';
import { BsGlobe2 } from "react-icons/bs";
import Shell from '@/assets/bash.svg';
import C from '@/assets/c.svg';
import CPlusPlus from '@/assets/c++.svg';
import Java from '@/assets/java.svg';
import JavaScript from '@/assets/javascript.svg';
import Prolog from '@/assets/prolog.svg';
import Python from '@/assets/python.svg';
import R from '@/assets/r.svg';
import Rust from '@/assets/rust.svg';
import TypeScript from '@/assets/typescript.svg';
import GitHub from '@/assets/github.svg';
import { Project } from '@/types/GitHubProjects';
import styles from '@/styles/components/projects/ProjectCard.module.css';

const languageIcons: Record<string, string> = {
  bash: Shell,
  c: C,
  "c++": CPlusPlus,
  java: Java,
  javascript: JavaScript,
  prolog: Prolog,
  python: Python,
  r: R,
  rust: Rust,
  typescript: TypeScript,
  shell: Shell,
};

const ProjectCard: React.FC<Project> = ({ name, description, language, tags,
  stars, sourceUrl, liveUrl }) => {
  const languageIconUrl = language ? languageIcons[language.toLowerCase()] : undefined;
  console.log(tags);
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
          <FaGithub className={styles.ctaIcon} /> Source
        </a>
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.ctaButton} ${styles.visit}`}>
            <BsGlobe2 className={styles.ctaIcon} /> Visit
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
