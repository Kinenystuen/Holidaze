import { useState } from "react";
import { useApi } from "../hooks/UseApi";
import { apiHostUrl } from "../library/constants";

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: object;
  location: object;
}

const Venues = () => {
  const [page, setPage] = useState(1); // Manage current page locally

  // Adjust the API URL dynamically based on `page`
  const { response, isLoading, isError, errorMessage } = useApi<Venue[]>(
    `${apiHostUrl}/holidaze/venues?limit=30&page=${page}`
  );

  const venues = response?.data || [];
  const meta = response?.meta;

  // Handler for the "Next" button
  const goToNextPage = () => {
    if (meta?.nextPage) {
      setPage(meta.nextPage);
    }
  };

  // Handler for the "Previous" button
  const goToPreviousPage = () => {
    if (meta?.previousPage) {
      setPage(meta.previousPage);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {errorMessage}</p>;

  return (
    <div className="container max-w-4xl mx-auto">
      <h1>Venues</h1>
      <div>
        {venues.map((venue: Venue) => (
          <div key={venue.id}>
            <h2>{venue.name}</h2>
            {venue.media?.length > 0 ? (
              <img
                src={venue.media[0].url}
                alt={venue.media[0].alt || "Venue image"}
                className="w-full h-full object-cover"
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))}
      </div>
      <div>
        <button onClick={goToPreviousPage} disabled={meta?.isFirstPage}>
          Previous
        </button>
        <button onClick={goToNextPage} disabled={meta?.isLastPage}>
          Next
        </button>
      </div>
      {meta && (
        <div>
          <p>
            Page {meta.currentPage} of {meta.pageCount}
          </p>
          <p>Total venues: {meta.totalCount}</p>
        </div>
      )}
    </div>
  );
};

export default Venues;
