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
import P from "../../../components/shared/Typography/P";

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
  const [dropdownPosition, setDropdownPosition] = useState<string>("left-0");

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
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
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
        setDropdownPosition("right-0");
      } else if (dropdownRect.left < 0) {
        setDropdownPosition("left-0");
      } else {
        setDropdownPosition("left-0");
      }
    }
  }, [isOpen]);

  return (
    <div className="relative md:flex md:items-center" ref={dropdownRef}>
      {/* Button only shows on small screens */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="inline-flex md:hidden flex-col text-sm md:flex-row justify-center content-center items-center px-4 py-1 sm:py-2 rounded-lg bg-transparent text-gray-600 hover:text-black hover:bg-transparent dark:hover:bg-transparent dark:text-whiteFont-500 dark:hover:text-white "
      >
        <FontAwesomeIcon icon={faFilter} className="mr-0 md:mr-2" />
        Filter
      </button>

      {/* Dropdown menu for small screens, always visible on md+ screens */}
      <div
        ref={dropdownRef}
        className={`${
          isOpen ? "block" : "hidden"
        } absolute md:relative md:flex md:flex-col gap-1 top-full md:top-0 mt-2 w-56 md:w-full bg-white md:bg-transparent dark:bg-customBgDark-500 dark:bg-transparent shadow-md md:shadow-none rounded-lg p-4 md:p-0 z-50 ${dropdownPosition}`}
      >
        <P className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
          Filter by:
        </P>
        <MetaCheckbox
          key={"wifi"}
          id={"wifi"}
          label={"wifi"}
          icon={faWifi}
          checked={filters.wifi}
          onChange={() => handleChange("wifi")}
        />
        <MetaCheckbox
          key={"parking"}
          id={"parking"}
          label={"parking"}
          icon={faCar}
          checked={filters.parking}
          onChange={() => handleChange("parking")}
        />
        <MetaCheckbox
          key={"breakfast"}
          id={"breakfast"}
          label={"breakfast"}
          icon={faUtensils}
          checked={filters.breakfast}
          onChange={() => handleChange("breakfast")}
        />
        <MetaCheckbox
          key={"pets"}
          id={"pets"}
          label={"pets"}
          icon={faPaw}
          checked={filters.pets}
          onChange={() => handleChange("pets")}
        />
      </div>
    </div>
  );
};

export default FilterMenu;
