import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faFilter,
  faPaw,
  faUtensils,
  faWifi
} from "@fortawesome/free-solid-svg-icons";
import MetaCheckbox from "../../../components/ui/MetaCheckbox";

/**
 * FilterMenu Component
 * - A dropdown filter menu for venues.
 * - Allows users to filter venues by WiFi, Parking, Breakfast, and Pets.
 * - @component
 * @param {Object} filters - The current filter state.
 * @param {Function} onFilterChange - The function to update the filter state.
 * @returns {JSX.Element} The FilterMenu component.
 */

const FilterMenu = ({
  filters,
  onFilterChange
}: {
  filters: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  boxPosition?: string;
  onFilterChange: (newFilters: typeof filters) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<string>(
    "left-1/2 -translate-x-1/2"
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (filter: keyof typeof filters) => {
    onFilterChange({ ...filters, [filter]: !filters[filter] });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isOpen && dropdownRef.current && buttonRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      if (dropdownRect.right > screenWidth) {
        setDropdownStyle("right-0 left-auto translate-x-[-10px]");
      } else if (dropdownRect.left < 0) {
        setDropdownStyle("left-0 right-auto translate-x-[10px]");
      } else {
        setDropdownStyle("right-0");
      }
    }
  }, [isOpen]);

  return (
    <div className="relative md:flex md:items-center">
      {/* Button (only visible on mobile screens) */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="inline-flex md:hidden flex-col text-sm md:flex-row justify-center content-center items-center mx-1 p-0 py-1 sm:py-2 rounded-lg bg-transparent text-gray-600 hover:text-black hover:bg-transparent dark:hover:bg-transparent dark:text-whiteFont-500 dark:hover:text-white"
      >
        <FontAwesomeIcon icon={faFilter} className="mr-0 md:mr-2" />
        Filter
      </button>

      {/* Dropdown menu for mobile, visible on md+ screens */}
      <div
        ref={dropdownRef}
        className={`${
          isOpen ? "block" : "hidden"
        } absolute md:relative md:flex md:flex-col gap-1 top-full md:top-0 mt-2 max-w-[90vw] w-56 md:w-full bg-white md:bg-transparent dark:bg-customBgDark-600 md:dark:bg-transparent shadow-lg md:shadow-none rounded-lg p-4 md:p-0 z-50 ${dropdownStyle}`}
      >
        <fieldset className="border-none p-0 m-0">
          <legend className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Filter by:
          </legend>

          <div className="flex flex-col space-y-2">
            <MetaCheckbox
              id="wifi"
              label="WiFi"
              icon={faWifi}
              checked={filters.wifi}
              onChange={() => handleChange("wifi")}
            />
            <MetaCheckbox
              id="parking"
              label="Parking"
              icon={faCar}
              checked={filters.parking}
              onChange={() => handleChange("parking")}
            />
            <MetaCheckbox
              id="breakfast"
              label="Breakfast"
              icon={faUtensils}
              checked={filters.breakfast}
              onChange={() => handleChange("breakfast")}
            />
            <MetaCheckbox
              id="pets"
              label="Pets Allowed"
              icon={faPaw}
              checked={filters.pets}
              onChange={() => handleChange("pets")}
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default FilterMenu;
