import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import LightModeIcon from "@/assets/light-mode.svg";
import DarkModeIcon from "@/assets/dark-mode.svg";
import styles from "@/styles/components/ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      <Image
        src={isDark ? DarkModeIcon : LightModeIcon}
        alt={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className={`${styles.icon} ${isDark ? styles.dark : ""}`}
      />
    </button>
  );
}
