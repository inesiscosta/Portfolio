import { HiPaperAirplane } from "react-icons/hi";
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from '@/styles/components/Footer.module.css';

export default function Footer() {
  const socialLinks = [
    { href: "mailto:me@inesiscosta.com",label: "Mail", icon: <HiPaperAirplane/> },
    { href: "https://linkedin.com/in/inesiscosta", label: "LinkedIn", icon: <FaLinkedin/> },
    { href: "https://github.com/inesiscosta", label: "GitHub", icon: <FaGithub/> },
  ];

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>© {new Date().getFullYear()} Inês Costa - All rights reserved.</p>
      <div className={styles.socialIcons}>
        {socialLinks.map(({ href, label, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={styles.socialIcon}>
            {icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
