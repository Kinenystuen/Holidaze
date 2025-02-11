import { useEffect, useState } from "react";
import { Venue } from "../../../components/library/types";
import { apiHostUrl } from "../../../components/library/constants";
import Loader from "../../../components/ui/Loader";
import VenuesData from "./VenuesData";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import P from "../../../components/shared/Typography/P";

const Venues = ({
  searchQuery,
  sortField,
  sortOrder,
  filters
}: {
  searchQuery: string;
  sortField: string;
  sortOrder: string;
  filters: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
}) => {
  const [page, setPage] = useState(1);
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [isFetchingAll, setIsFetchingAll] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Function to fetch all pages of venues using while loop
  const fetchAllVenues = async () => {
    let allData: Venue[] = [];
    let currentPage = 1;
    let hasMore = true;

    try {
      while (hasMore) {
        const response = await fetch(
          `${apiHostUrl}/holidaze/venues?limit=100&page=${currentPage}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.errors?.[0]?.message || "Failed to fetch venues"
          );
        }

        allData = [...allData, ...data.data]; // Merge new data
        hasMore = data.meta?.nextPage ? true : false;
        currentPage++;
      }

      setAllVenues(allData);
      setIsFetchingAll(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFetchError(error.message);
      } else {
        setFetchError("An unknown error occurred");
      }
      setIsFetchingAll(false);
    }
  };

  useEffect(() => {
    fetchAllVenues();
  }, []);

  useEffect(() => {
    const filterAndSortVenues = () => {
      let result = [...allVenues];

      if (searchQuery.trim() !== "") {
        result = result.filter((venue) => {
          const query = searchQuery.toLowerCase();

          // Check name and description
          const matchesName = venue.name.toLowerCase().includes(query);
          const matchesDescription =
            venue.description &&
            venue.description.toLowerCase().includes(query);

          // Check location fields (handle missing fields safely)
          const matchesLocation =
            venue.location &&
            ["address", "city", "zip", "country", "continent"].some(
              (key) =>
                venue.location[key as keyof typeof venue.location] &&
                venue.location[key as keyof typeof venue.location] &&
                typeof venue.location[key as keyof typeof venue.location] ===
                  "string" &&
                (venue.location[key as keyof typeof venue.location] as string)
                  .toLowerCase()
                  .includes(query)
            );

          return matchesName || matchesDescription || matchesLocation;
        });
      }

      // Apply filters
      if (filters.wifi) result = result.filter((v) => v.meta.wifi);
      if (filters.parking) result = result.filter((v) => v.meta.parking);
      if (filters.breakfast) result = result.filter((v) => v.meta.breakfast);
      if (filters.pets) result = result.filter((v) => v.meta.pets);

      // Apply sorting
      result.sort((a, b) => {
        const valA = a[sortField as keyof Venue] as number | string | boolean;
        const valB = b[sortField as keyof Venue] as number | string | boolean;

        if (valA === valB) return 0;
        if (sortOrder === "asc") return valA > valB ? 1 : -1;
        return valA < valB ? 1 : -1;
      });

      return result;
    };

    const filteredResults = filterAndSortVenues();
    setFilteredVenues(filteredResults);
  }, [allVenues, searchQuery, filters, sortField, sortOrder]);

  // Handle Pagination
  const itemsPerPage = 30;
  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  const paginatedVenues = filteredVenues.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const goToSelPage = (page: number) => {
    setPage(page);
  };

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (isFetchingAll) return <Loader />;
  if (fetchError)
    return (
      <P>
        <ErrorMessage message={fetchError} />
      </P>
    );

  return (
    <VenuesData
      venues={paginatedVenues}
      meta={{
        currentPage: page,
        pageCount: totalPages,
        totalCount: filteredVenues.length,
        isFirstPage: page === 1,
        isLastPage: page === totalPages
      }}
      goToSelPage={goToSelPage}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
    />
  );
};

export default Venues;
