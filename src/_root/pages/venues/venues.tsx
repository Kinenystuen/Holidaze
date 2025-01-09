import { useState, useEffect } from "react";
import { useApi } from "../../../components/hooks/UseApi";
import { apiHostUrl } from "../../../components/library/constants";
import { useSearchParams } from "react-router-dom";
import { Venue } from "../../../components/library/types";
import Button from "../../../components/shared/Button/Button";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import Loader from "../../../components/ui/Loader";
import H1 from "../../../components/shared/Typography/H1";

const Venues = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(search);

  const apiUrl = search
    ? `${apiHostUrl}/holidaze/venues/search?q=${encodeURIComponent(
        search
      )}&limit=30&page=${page}`
    : `${apiHostUrl}/holidaze/venues?limit=30&page=${page}`;

  const { response, isLoading, isError, errorMessage } =
    useApi<Venue[]>(apiUrl);

  const venues = response?.data || [];
  const meta = response?.meta;

  const clearSearch = () => {
    setSearchParams({});
    setSearchInput("");
    setPage(1);
  };

  // Update the URL query parameters when the search input changes
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: searchInput });
    setPage(1);
  };

  const goToNextPage = () => {
    if (meta?.nextPage) {
      setPage(meta.nextPage);
    }
  };

  const goToPreviousPage = () => {
    if (meta?.previousPage) {
      setPage(meta.previousPage);
    }
  };

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p>
        <ErrorMessage message={errorMessage} />
      </p>
    );

  return (
    <div className="container max-w-4xl mx-auto">
      <H1 className="text-2xl font-bold mb-4">Venues</H1>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for venues..."
          className="border rounded px-4 py-2 w-full text-black"
        />
        <Button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </Button>
        <Button
          buttonType="transparent"
          className="mt-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          onClick={clearSearch}
        >
          Clear search
        </Button>
      </form>

      {/* Venue List */}
      <div>
        {venues.map((venue: Venue) => (
          <div key={venue.id} className="mb-6">
            <h2 className="text-xl font-semibold">{venue.name}</h2>
            {venue.media?.length > 0 ? (
              <img
                src={venue.media[0].url}
                alt={venue.media[0].alt || "Venue image"}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        {/* <button
          onClick={goToPreviousPage}
          disabled={meta?.isFirstPage}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          disabled={meta?.isLastPage}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Next
        </button> */}
      </div>

      {/* Pagination Info */}
      {meta && (
        <>
          <div className="mt-4">
            <p>
              Page {meta.currentPage} of {meta.pageCount}
            </p>
            <p>Total venues: {meta.totalCount}</p>
          </div>
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={goToPreviousPage}
              disabled={meta.isFirstPage}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50"
            >
              Previous
            </Button>
            <p className="text-gray-600">
              Page {meta.currentPage} of {meta.pageCount}
            </p>
            <Button
              onClick={goToNextPage}
              disabled={meta.isLastPage}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Venues;
