import { useState } from "react";
import { useDebounce } from "../../../components/hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import SearchBarHomeActions from "./SearchBarHomeActions";

const SearchBarHome = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(false); // Error state
  const navigate = useNavigate();

  // Debounce the query/loading time
  const debouncedQuery = useDebounce(query, 100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setError(false); // Clear error when typing
    setShowResults(true);
  };

  const handleFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  const handleSearch = () => {
    setShowResults(false);
    if (query.trim() === "") {
      setError(true); // Set error if input is empty
    } else {
      navigate(`/venues?search=${query}`);
    }
  };

  return (
    <div className="relative mt-8 w-full flex justify-center">
      <div className="relative w-full max-w-md flex flex-col">
        <div className="flex">
          <input
            type="text"
            placeholder="Search for venues..."
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 text-lg rounded-s-full border text-black dark:placeholder-customBgDark-500 dark:bg-color2-600 border-gray-300 dark:border-color3-800 focus:ring-2 focus:outline-none ${
              error ? "border-red-500 focus:ring-red-500" : "focus:ring-color2"
            }`}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-6 py-3 bg-color1 text-white font-semibold rounded-r-full hover:bg-color3 dark:border-color3-800 transition duration-300"
          >
            Search
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-2">
            Please enter a search term.
          </p>
        )}
      </div>
      {showResults && debouncedQuery.trim() !== "" && (
        <SearchBarHomeActions
          query={debouncedQuery}
          showResults={showResults}
          setShowResults={setShowResults}
        />
      )}
    </div>
  );
};

export default SearchBarHome;
