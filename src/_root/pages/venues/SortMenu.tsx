import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import P from "../../../components/shared/Typography/P";

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
    setIsOpen(false);
  };

  return (
    <div className="relative text-left">
      {/* Sort Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="inline-flex flex-col text-sm md:flex-row bg-transparent text-black dark:text-whiteFont-500 justify-center content-center items-center px-4 py-1 sm:py-2 rounded-lg hover:border-color2-500 dark:hover:border-customBgDark-500 hover:bg-color2-300  dark:hover:bg-customBgDark-400 focus:outline-none"
      >
        <FontAwesomeIcon icon={faSort} className="sm:mr-2 " />
        Sort
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 right-0 w-56 bg-white dark:bg-customBgDark-500 border border-gray-200 dark:border-customBgDark-600 rounded-lg shadow-lg z-10"
        >
          <div className="p-4">
            <div className="mb-4">
              <P className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Sort by:
              </P>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortField"
                    value="name"
                    checked={sortField === "name"}
                    onChange={() => handleSortChange("name", sortOrder)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Name
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortField"
                    value="price"
                    checked={sortField === "price"}
                    onChange={() => handleSortChange("price", sortOrder)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Price
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortField"
                    value="rating"
                    checked={sortField === "rating"}
                    onChange={() => handleSortChange("rating", sortOrder)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Rating
                  </span>
                </label>
              </div>
            </div>
            <div>
              <P className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Order:
              </P>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortOrder"
                    value="asc"
                    checked={sortOrder === "asc"}
                    onChange={() => handleSortChange(sortField, "asc")}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Ascending
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortOrder"
                    value="desc"
                    checked={sortOrder === "desc"}
                    onChange={() => handleSortChange(sortField, "desc")}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Descending
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortMenu;
