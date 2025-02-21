import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faSort,
  faSortAlphaAsc,
  faSortAmountDown,
  faSortAmountDownAlt,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import MetaRadio from "../../../components/ui/MetaRadio";

interface SortMenuProps {
  sortField: string;
  sortOrder: string;
  onSortChange: (field: string, order: string) => void;
}

const SortMenu: React.FC<SortMenuProps> = ({
  sortField,
  sortOrder,
  onSortChange
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

  // Close dropdown if clicking outside
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
        setDropdownStyle("right-0 right-auto translate-x-[-10px]");
      } else if (dropdownRect.left < 0) {
        setDropdownStyle("left-0 right-auto translate-x-[10px]");
      } else {
        setDropdownStyle("right-0");
      }
    }
  }, [isOpen]);

  // Adjust dropdown position dynamically
  const handleSortChange = (field: string, order: string) => {
    onSortChange(field, order);
    setIsOpen(false);
  };

  return (
    <div className="relative text-left">
      {/* Sort Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="inline-flex md:hidden flex-col text-sm md:flex-row justify-center content-center items-center p-0 mx-2 py-1 sm:py-2 rounded-lg bg-transparent text-gray-600 hover:text-black hover:bg-transparent dark:hover:bg-transparent dark:text-whiteFont-500 dark:hover:text-white "
      >
        <FontAwesomeIcon icon={faSort} className="mr-0 md:mr-2" />
        Sort
      </button>

      {/* Dropdown Menu */}
      <div
        ref={dropdownRef}
        className={`${
          isOpen ? "block" : "hidden"
        } absolute md:relative md:flex md:flex-col gap-1 top-full md:top-0 mt-2 max-w-[90vw] w-56 md:w-full bg-white md:bg-transparent dark:bg-customBgDark-500 dark:bg-transparent shadow-md md:shadow-none rounded-lg p-4 md:p-0 z-50 ${dropdownStyle}`}
      >
        <fieldset className="p-4 md:p-0 w-full">
          <div className="mb-4">
            <legend className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Sort by:
            </legend>
            <div className="flex flex-col space-y-1 ">
              <MetaRadio
                id="sort-name"
                name="sortField"
                label="Name"
                icon={faSortAlphaAsc}
                checked={sortField === "name"}
                onChange={() => handleSortChange("name", sortOrder)}
              />

              <MetaRadio
                id="sort-price"
                name="sortField"
                label="Price"
                icon={faMoneyBill1Wave}
                checked={sortField === "price"}
                onChange={() => handleSortChange("price", sortOrder)}
              />

              <MetaRadio
                id="sort-rating"
                name="sortField"
                label="Rating"
                icon={faStar}
                checked={sortField === "rating"}
                onChange={() => handleSortChange("rating", sortOrder)}
              />
            </div>
          </div>
          <div>
            <legend className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Order:
            </legend>
            <div className="flex flex-col space-y-1">
              <MetaRadio
                id="sort-asc"
                name="sortOrder"
                label="Ascending"
                icon={faSortAmountDownAlt}
                checked={sortOrder === "asc"}
                onChange={() => handleSortChange(sortField, "asc")}
              />

              <MetaRadio
                id="sort-desc"
                name="sortOrder"
                label="Descending"
                icon={faSortAmountDown}
                checked={sortOrder === "desc"}
                onChange={() => handleSortChange(sortField, "desc")}
              />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default SortMenu;
