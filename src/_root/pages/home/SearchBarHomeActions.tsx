import React, { useEffect, useState } from "react";
import { useApi } from "../../../components/hooks/UseApi";
import { Venue } from "../../../components/library/types";
import { apiHostUrl } from "../../../components/library/constants";
import { Link, useNavigate } from "react-router-dom";
import H3 from "../../../components/shared/Typography/H3";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import Button from "../../../components/shared/Button/Button";
import P from "../../../components/shared/Typography/P";

interface SearchBarHomeActionsProps {
  query: string;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
}

const SearchBarHomeActions: React.FC<SearchBarHomeActionsProps> = ({
  query,
  showResults,
  setShowResults
}) => {
  const [results, setResults] = useState<Venue[]>([]);
  const navigate = useNavigate();

  const { response, isLoading, isError, errorMessage, fetchData } = useApi<
    Venue[]
  >(`${apiHostUrl}/holidaze/venues/search?q=${query}`);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const debounce = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, fetchData]);

  useEffect(() => {
    if (response?.data) {
      setResults(response.data.slice(0, 5));
    }
  }, [response]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/venues?search=${query}`);
      setShowResults(false);
    }
  };

  if (!showResults) return null;

  return (
    <div className="absolute top-16 left-0  sm:left-8 w-full max-w-md bg-white dark:bg-customBgDark-500 shadow-lg border border-gray-300 dark:border-customBgDark-600 rounded-lg overflow-hidden z-10">
      {isLoading && (
        <div className="p-4 flex items-center justify-center">
          <LoaderSmall />
        </div>
      )}
      {!isLoading && results.length > 0 && (
        <ul className="divide-y divide-gray-200 dark:divide-customBgDark-600">
          {results.map((venue, index) => (
            <Link to={`/venues/${venue.id}`} key={venue.id}>
              <li
                key={index}
                className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-customBgDark-400 cursor-pointer"
              >
                <img
                  src={
                    venue.media && venue.media.length > 0
                      ? venue.media[0].url
                      : "https://via.placeholder.com/50"
                  }
                  alt={venue.name}
                  className="w-12 h-12 rounded-md mr-4"
                />
                <div>
                  <H3 className="font-semibold text-start text-gray-800 dark:text-whiteFont-500">
                    {venue.name}
                  </H3>
                  <P className="text-sm text-gray-600 dark:text-whiteFont-600 text-start capitalize">
                    {venue.location?.continent &&
                      `${venue.location.continent} - `}
                    {venue.location?.country && `${venue.location.country} - `}
                    {venue.location?.city && `${venue.location.city} - `}
                    {venue.location?.address && `${venue.location.address}`}
                  </P>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
      {!isLoading && results.length === 0 && (
        <div className="p-4 text-sm text-gray-600">
          No results found for "{query}".
        </div>
      )}
      {results.length > 0 && (
        <div className="text-center p-4 dark:border-2 border-t border-gray-300 dark:border-customBgDark-700 bg-gray-50 dark:bg-customBgDark-600">
          {results.length === 5 && (
            <>
              <P className="text-sm text-gray-600 dark:text-whiteFont-500">
                {results.length}/{response?.data.length}
              </P>
              <P className="text-sm text-gray-600 dark:text-whiteFont-500">
                More results available...
              </P>
            </>
          )}
          <div>
            <Button
              buttonType="violet"
              className="rounded-full mt-3"
              onClick={handleSearch}
            >
              See all results
            </Button>
          </div>
        </div>
      )}
      {isError && (
        <div className="p-4 text-sm text-red-600">Error: {errorMessage}</div>
      )}
    </div>
  );
};

export default SearchBarHomeActions;
