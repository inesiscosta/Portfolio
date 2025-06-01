"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Theme, ThemeContextInterface } from "@/types/ThemeContext";

const ThemeContext = createContext<ThemeContextInterface>({
  theme: undefined,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children, initialTheme }: { children: React.ReactNode, initialTheme: Theme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    if (!initialTheme) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(systemTheme);
      document.documentElement.className = systemTheme;
      document.cookie = `theme=${systemTheme}; path=/; max-age=31536000`;
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.className = newTheme;
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [initialTheme]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
        setTheme(e.newValue as Theme);
        document.documentElement.className = e.newValue;
        document.cookie = `theme=${e.newValue}; path=/; max-age=31536000`;
      } else if (e.key === "theme" && e.newValue === null) {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        setTheme(systemTheme);
        document.documentElement.className = systemTheme;
        document.cookie = `theme=${systemTheme}; path=/; max-age=31536000`;
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Note: Safari ignores the theme-color meta tag in dark mode if it is not within a certain range of colors (namely too light of colors will be ignored).
  useEffect(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
