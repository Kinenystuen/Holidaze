import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button/Button";
import { useTheme } from "../hooks/UseTheme";
import Tooltip from "../ui/ToolTip";

/**
 * ThemeToggle - A button to toggle between light and dark themes.
 * - Uses `useTheme` to access the current theme and toggle function.
 *
 * @component
 * @returns {JSX.Element} The ThemeToggle component.
 */

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Tooltip text={darkMode ? "Light mode" : "Dark mode"} position="bottom">
      <Button
        onClick={toggleTheme}
        buttonType="transparent"
        className={`flex justify-center w-10 h-10 items-center p-2 rounded-full transition-colors duration-300 bg-transparent hover:scale-105 text-gray-700 dark:text-whiteFont-600`}
        aria-label="Toggle Dark Mode"
        title={darkMode ? "Light mode" : "Dark mode"}
      >
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="text-lg" />
      </Button>
    </Tooltip>
  );
};

export default ThemeToggle;
