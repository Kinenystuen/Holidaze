import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button/Button";
import { useTheme } from "../hooks/UseTheme";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className={`flex justify-center w-10 h-10 items-center p-2 rounded-full transition-colors duration-300 bg-transparent hover:scale-105 text-gray-700 dark:text-whiteFont-600`}
      aria-label="Toggle Dark Mode"
      title={darkMode ? "Light mode" : "Dark mode"}
    >
      <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="text-lg" />
    </Button>
  );
};

export default ThemeToggle;
