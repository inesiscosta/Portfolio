import Link from "next/link";
import styles from "@/styles/pages/NotFound.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className={styles.link}>Go back to the homepage.</Link>
    </div>
  );
}
