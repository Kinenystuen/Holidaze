import { ButtonProps } from "../../library/types";

function Button({
  onClick,
  children,
  className,
  title,
  ariaLabel,
  buttonType,
  disabled,
  type
}: ButtonProps) {
  let buttonClass = "";

  switch (buttonType) {
    case "blue":
      buttonClass =
        "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white";
      break;
    case "violet":
      buttonClass =
        "bg-color1  hover:bg-color3 dark:bg-color1 dark:hover:bg-color3 dark:text-whiteFont-500 dark:hover:border-color3 rounded-full";
      break;
    case "violetSecondary":
      buttonClass =
        "bg-transparent dark:bg-transparent hover:bg-color2-200 dark:hover:bg-color2-500 border-color2-500 dark:border-color1-300 border-2 text-color1-500 dark:text-color2-600 dark:hover:text-black rounded-full";
      break;
    case "transparent":
      buttonClass =
        "bg-transparent text-gray-600 hover:text-black hover:bg-transparent dark:hover:bg-transparent  dark:text-whiteFont-500 dark:hover:text-white ";
      break;
    default:
      buttonClass =
        "bg-gray-500 text-black dark:bg-BtnColor dark:hover:bg-BtnColor-400";
  }

  return (
    <button
      onClick={onClick}
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
