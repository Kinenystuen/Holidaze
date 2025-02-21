import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface MetaRadioProps {
  id: string;
  name: string;
  label: string;
  icon: IconDefinition;
  checked: boolean;
  onChange: () => void;
}

/**
 * A custom radio button component with a label and icon.
 *
 * @component
 * @param {MetaRadioProps} props - The component props.
 * @returns {JSX.Element} The MetaRadio component.
 *
 * @example
 * // Example usage:
 * <MetaRadio
 *  id="radio1"
 *  name="radioGroup"
 *  label="Option 1"
 *  icon={faCheckCircle}
 *  checked={true}
 *  onChange={() => console.log("Option 1 selected")}
 * />
 */
const MetaRadio: React.FC<MetaRadioProps> = ({
  id,
  name,
  label,
  icon,
  checked,
  onChange
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onChange();
    }
  };

  return (
    <label
      htmlFor={id}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="flex items-center gap-3 cursor-pointer p-3 rounded-md border border-gray-300 dark:border-customBgDark-500 
        bg-white dark:bg-customBgDark-500 text-black dark:text-whiteFont-500 transition-all duration-300 
        hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-color4-700 outline-none"
    >
      {/* Custom Radio */}
      <div className="relative w-4 h-4">
        <input
          type="radio"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="hidden peer"
        />
        <div
          className={`w-full h-full border-2 rounded-full 
          flex items-center justify-center transition-all duration-200
          ${checked ? "bg-color1-500 border-color1-500" : "border-gray-400"}`}
        >
          {checked && <div className="w-2 h-2 bg-white rounded-full" />}
        </div>
      </div>

      {/* Meta Icon */}
      <FontAwesomeIcon
        icon={icon}
        className={`text-lg ${
          checked
            ? "text-color1-500 dark:text-color1-200"
            : "text-gray-600 dark:text-gray-300"
        }`}
      />

      {/* Label */}
      <span
        className={`text-sm font-medium capitalize ${
          checked
            ? "text-color1-500 dark:text-color1-200"
            : "text-black dark:text-whiteFont-500"
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export default MetaRadio;
