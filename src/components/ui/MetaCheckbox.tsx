import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface MetaCheckboxProps {
  id: string;
  label: string;
  icon: IconDefinition;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const MetaCheckbox: React.FC<MetaCheckboxProps> = ({
  id,
  label,
  icon,
  checked,
  onChange
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <label
      htmlFor={id}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="flex items-center gap-3 cursor-pointer p-3 rounded-md border border-gray-300 dark:border-zinc-700 
                 bg-white dark:bg-customBgDark-500 text-black dark:text-whiteFont-500 transition-all duration-300 
                 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-color4-700 outline-none"
    >
      {/* Custom Checkbox */}
      <div className="relative w-4 h-4">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer hidden"
        />
        {/* Checkbox background */}
        <div
          className="w-full h-full border-2 border-gray-400 rounded-md peer-checked:bg-color1-500 peer-checked:border-color1-500 
                       flex items-center justify-center transition-all duration-200"
        >
          {/* Checkmark */}
          {checked && (
            <FontAwesomeIcon icon={faCheck} className="text-white w-3 h-3" />
          )}
        </div>
      </div>

      {/* Meta Icon */}
      <FontAwesomeIcon
        icon={icon}
        className="w-5 h-5 text-gray-600 dark:text-gray-300"
      />

      {/* Text */}
      <span className="text-sm font-medium capitalize">{label}</span>
    </label>
  );
};

export default MetaCheckbox;
