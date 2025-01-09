import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button/Button";
import { useTheme } from "../hooks/UseTheme";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      buttonType="transparent"
      className={`text-lg p-2 m-0 md:mt-2 lg:m-0 rounded hover:border-transparent transition-colors duration-300 bg-transparent dark:hover:bg-transparent dark:text-whiteFont-600 dark:hover:text-whiteFont-500 text-gray-700 z-30 lg:mr-1 focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray ${
        darkMode ? "px-2" : "px-[0.7rem]"
      }`}
      aria-label="Toggle Dark Mode"
      title={`${darkMode ? "Light mode" : "Dark mode"}`}
    >
      <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
    </Button>
  );
};

export default ThemeToggle;
