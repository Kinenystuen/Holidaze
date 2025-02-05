import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faSort,
  faSortAlphaAsc,
  faSortAmountDownAlt,
  faSortAmountUp,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import P from "../../../components/shared/Typography/P";
import MetaRadio from "../../../components/ui/MetaRadio";

interface SortMenuProps {
  sortField: string;
  sortOrder: string;
  onSortChange: (field: string, order: string) => void;
  boxPosition?: string;
}

const SortMenu: React.FC<SortMenuProps> = ({
  sortField,
  sortOrder,
  onSortChange,
  boxPosition = "left-0"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close dropdown only if the click is outside both the dropdown and the button
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

  const handleSortChange = (field: string, order: string) => {
    onSortChange(field, order);
    // setIsOpen(false);
  };

  return (
    <div className="relative text-left">
      {/* Sort Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="inline-flex flex-col text-sm md:flex-row justify-center content-center items-center px-4 py-1 sm:py-2 rounded-lg bg-transparent text-gray-600 hover:text-black hover:bg-transparent dark:hover:bg-transparent dark:text-whiteFont-500 dark:hover:text-white "
      >
        <FontAwesomeIcon icon={faSort} className="mr-0 md:mr-2" />
        Sort
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute top-full mt-2 w-56 bg-white dark:bg-customBgDark-500 border border-gray-200 dark:border-customBgDark-600 rounded-lg shadow-lg z-10 ${boxPosition}`}
        >
          <div className="p-4">
            <div className="mb-4">
              <P className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Sort by:
              </P>
              <div className="flex flex-col space-y-1">
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
              <P className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Order:
              </P>
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
                  icon={faSortAmountUp}
                  checked={sortOrder === "desc"}
                  onChange={() => handleSortChange(sortField, "desc")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortMenu;
