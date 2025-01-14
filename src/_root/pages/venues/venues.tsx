import { useEffect, useMemo, useState } from "react";
import { Venue } from "../../../components/library/types";
import { apiHostUrl } from "../../../components/library/constants";
import { useApi } from "../../../components/hooks/UseApi";
import Loader from "../../../components/ui/Loader";
import P from "../../../components/shared/Typography/P";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import VenuesData from "./VenuesData";

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
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);

  const apiUrl =
    searchQuery !== ""
      ? `${apiHostUrl}/holidaze/venues/search?q=${encodeURIComponent(
          searchQuery
        )}&limit=30&page=${page}`
      : `${apiHostUrl}/holidaze/venues?limit=30&page=${page}`;

  const { response, isLoading, isError, errorMessage } =
    useApi<Venue[]>(apiUrl);

  const venues = useMemo(() => response?.data || [], [response]);

  const meta = response?.meta;

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filters]);

  // Filter and sort venues
  useEffect(() => {
    const filterAndSortVenues = () => {
      let result = [...venues];

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

    setFilteredVenues(filterAndSortVenues());
  }, [venues, filters, sortField, sortOrder]);

  const goToSelPage = (page: number) => {
    setPage(page);
  };

  const goToNextPage = () => {
    if (meta?.nextPage) setPage(meta.nextPage);
  };

  const goToPreviousPage = () => {
    if (meta?.previousPage) setPage(meta.previousPage);
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <P>
        <ErrorMessage message={errorMessage} />
      </P>
    );

  return (
    <VenuesData
      venues={filteredVenues}
      meta={
        meta || {
          currentPage: 0,
          pageCount: 0,
          totalCount: 0,
          isFirstPage: true,
          isLastPage: true
        }
      }
      goToSelPage={goToSelPage}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
    />
  );
};

export default Venues;
