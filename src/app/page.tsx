import styles from '@/styles/pages/HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.hero}>
      <div className={styles.location}>
        📍 Lisbon, Portugal
      </div>
      <h1 className={styles.intro}>Hi there, I&apos;m Inês! <span>👋</span></h1>
      <h2>Welcome to my little corner of the web.</h2>
    </div>
  );
}
