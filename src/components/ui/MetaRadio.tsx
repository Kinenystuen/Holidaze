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
          className="peer hidden"
        />
        <div
          className="w-full h-full border-2 border-gray-400 rounded-full 
                     peer-checked:bg-blue-600 peer-checked:border-blue-600 
                     flex items-center justify-center transition-all duration-200"
        >
          {checked && <div className="w-2 h-2 bg-white rounded-full" />}
        </div>
      </div>

      {/* Meta Icon */}
      <FontAwesomeIcon
        icon={icon}
        className="text-lg text-gray-600 dark:text-gray-300"
      />

      {/* Label */}
      <span className="text-sm font-medium capitalize">{label}</span>
    </label>
  );
};

export default MetaRadio;
