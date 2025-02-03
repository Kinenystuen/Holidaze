import { useState, useEffect, useRef } from "react";
import Button from "../../../components/shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faFilter,
  faPaw,
  faUtensils,
  faWifi
} from "@fortawesome/free-solid-svg-icons";
import MetaCheckbox from "../../../components/ui/MetaCheckbox";

const FilterMenu = ({
  filters,
  onFilterChange,
  boxPosition = "left-0"
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
        buttonType="transparent"
        onClick={toggleDropdown}
        className="inline-flex flex-col text-sm md:flex-row justify-center content-center items-center px-4 py-1 sm:py-2 rounded-lg "
      >
        <FontAwesomeIcon icon={faFilter} className="mr-0 md:mr-2" />
        Filter
      </Button>
      {isOpen && (
        <div
          className={`absolute top-full space-y-1 mt-2 w-56 bg-white dark:bg-customBgDark-500 shadow-md rounded-lg p-4 z-10 ${boxPosition}`}
        >
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
      )}
    </div>
  );
};

export default FilterMenu;
