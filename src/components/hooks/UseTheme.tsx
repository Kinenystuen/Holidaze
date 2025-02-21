import { useState, useEffect } from "react";

/**
 * useTheme - Custom hook for managing dark mode theme.
 * - Uses localStorage to persist theme preference.
 * - Uses prefers-color-scheme media query to detect system theme.
 * - @returns {Object} The darkMode state and toggleTheme function.
 */
export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return { darkMode, toggleTheme };
};
