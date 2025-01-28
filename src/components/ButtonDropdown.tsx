import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Button from "./shared/Button/Button";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonDropdownProps {
  label: string;
  options: {
    label: string;
    action: () => void;
    icon?: IconProp;
    danger?: boolean;
  }[];
}

const ButtonDropdown: React.FC<ButtonDropdownProps> = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative  inline-block text-left" ref={dropdownRef}>
      <Button
        buttonType="violetSecondary"
        onClick={() => setIsOpen(!isOpen)}
        className=""
      >
        {label} <FontAwesomeIcon icon={faEllipsisV} className="ml-2" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-customBgDark-500 border rounded-lg shadow-md overflow-hidden">
          {options.map((option, index) => (
            <Button
              buttonType="violetSecondary"
              key={index}
              onClick={() => {
                option.action();
                setIsOpen(false); // Close dropdown after clicking
              }}
              className={`flex items-center w-full text-left px-4 py-2 text-sm border-transparent rounded-none ${
                option.danger
                  ? "text-red-500 hover:bg-red-100 dark:hover:bg-red-700"
                  : ""
              }`}
            >
              {option.icon && (
                <FontAwesomeIcon icon={option.icon} className="mr-2" />
              )}
              {option.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ButtonDropdown;
