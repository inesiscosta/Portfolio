"use client";

import { useTheme } from "@/context/ThemeContext";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === "light" ? <IoSunnyOutline/> : <IoMoonOutline/>}
    </button>
  );
}
