import React, { useState } from "react";
import SearchBarHomeActions from "./SearchBarHomeActions";

const SearchBarHome = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  const handleFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  const handleSearch = () => {
    setShowResults(false);
  };

  return (
    <div className="relative mt-8 w-full flex justify-center">
      <div className="relative w-full max-w-md flex">
        <input
          type="text"
          placeholder="Search for venues..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full px-4 py-3 text-lg rounded-s-full border text-black dark:placeholder-customBgDark-500 dark:bg-color2-600 border-gray-300 dark:border-color3-800 focus:ring-2 focus:ring-color2 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="px-6 py-3 bg-color1 text-white font-semibold rounded-r-full hover:bg-color3 dark:border-color3-800 transition duration-300"
        >
          Search
        </button>
      </div>
      {showResults && query.trim() !== "" && (
        <SearchBarHomeActions
          query={query}
          showResults={showResults}
          setShowResults={setShowResults}
        />
      )}
    </div>
  );
};

export default SearchBarHome;
