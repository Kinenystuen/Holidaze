import { ButtonProps } from "../../library/types";

/**
 * Reusable Button Component with different styles and behaviors.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {() => void} [props.onClick] - Function called when the button is clicked
 * @param {React.ReactNode} props.children - The button's content (text, icons, etc.)
 * @param {string} [props.className] - Additional CSS classes for styling
 * @param {string} [props.title] - Tooltip text displayed on hover
 * @param {string} [props.ariaLabel] - Accessible name for screen readers
 * @param {"blue" | "violet" | "violetSecondary" | "transparent"} [props.buttonType] - Defines the button's style variant
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @param {"button" | "submit" | "reset"} [props.type="button"] - The button's type attribute
 * @returns {JSX.Element} The styled button component
 */
function Button({
  onClick,
  children,
  className,
  title,
  ariaLabel,
  buttonType,
  disabled,
  type = "button"
}: ButtonProps) {
  let buttonClass = "";

  switch (buttonType) {
    case "blue":
      buttonClass =
        "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white";
      break;
    case "violet":
      buttonClass =
        "bg-color1 hover:bg-color3 dark:bg-color1 dark:hover:bg-color3 dark:text-whiteFont-500 dark:hover:border-color3 rounded-full";
      break;
    case "violetSecondary":
      buttonClass =
        "bg-transparent dark:bg-transparent hover:bg-color2-200 dark:hover:bg-color2-500 border-color2-500 dark:border-color1-300 border-2 text-color1-500 dark:text-color2-600 dark:hover:text-black rounded-full";
      break;
    case "transparent":
      buttonClass =
        "bg-transparent text-gray-600 hover:text-black hover:bg-transparent dark:hover:bg-transparent dark:text-whiteFont-500 dark:hover:text-white ";
      break;
    default:
      buttonClass =
        "bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-whiteFont-500 dark:hover:border-gray-600 rounded-full";
  }

  return (
    <button
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }
      }}
      title={title}
      aria-label={ariaLabel}
      type={type}
      disabled={disabled}
      className={`button rounded transition duration-300 ease-in-out ${buttonClass} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
