import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import LightModeIcon from "@/assets/light-mode.svg";
import DarkModeIcon from "@/assets/dark-mode.svg";
import styles from "@/styles/components/ThemeToggle.module.css";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      <Image
        src={isDark ? DarkModeIcon : LightModeIcon}
        alt={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className={styles.icon}
      />
    </button>
  );
}
