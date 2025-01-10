import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const initialSearch = searchParams.get("search") || "";
    if (initialSearch) {
      setSearchInput(initialSearch);
      onSearch(initialSearch);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInput(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchInput("");
    onSearch("");
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("search");
    setSearchParams(updatedParams, { replace: true });
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <div className="relative">
        {/* Search-icon */}
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 pointer-events-none">
          <FontAwesomeIcon icon={faSearch} />
        </span>

        {/* Search-input */}
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search for venues..."
          className="w-full pl-10 pr-10 py-2 border rounded-full text-black dark:placeholder-customBgDark-500 dark:bg-color2-600 border-gray-300 dark:border-color3-800 focus:ring-2 focus:outline-none focus:ring-color2"
        />

        {/* Clear-button */}
        {searchInput && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center bg-transparent text-gray-500 hover:text-black"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
