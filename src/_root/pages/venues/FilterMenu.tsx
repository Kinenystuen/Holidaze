import { useState, useEffect, useRef } from "react";
import Button from "../../../components/shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

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
  onFilterChange: (newFilters: typeof filters) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={toggleDropdown}
        className="inline-flex flex-col text-sm md:flex-row bg-transparent text-black dark:text-whiteFont-500 justify-center content-center items-center px-4 py-1 sm:py-2 rounded-lg hover:border-color2-500 dark:hover:border-customBgDark-500 hover:bg-color2-300  dark:hover:bg-customBgDark-400 focus:outline-none"
      >
        <FontAwesomeIcon icon={faFilter} className="sm:mr-2 " />
        Filter
      </Button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-56 bg-white dark:bg-customBgDark-500 shadow-md rounded-lg p-4 z-10">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.wifi}
              onChange={() => handleChange("wifi")}
              className="mr-2"
            />
            WiFi
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.parking}
              onChange={() => handleChange("parking")}
              className="mr-2"
            />
            Parking
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.breakfast}
              onChange={() => handleChange("breakfast")}
              className="mr-2"
            />
            Breakfast
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.pets}
              onChange={() => handleChange("pets")}
              className="mr-2"
            />
            Pets
          </label>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
