import { useEffect, useState } from "react";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import P from "../../../components/shared/Typography/P";
import Loader from "../../../components/ui/Loader";
import VenuesData from "./VenuesData";
import { apiHostUrl } from "../../../components/library/constants";
import { Venue } from "../../../components/library/types";
import { useApi } from "../../../components/hooks/UseApi";

const Venues = ({
  searchQuery,
  sortField,
  sortOrder
}: {
  searchQuery: string;
  sortField: string;
  sortOrder: string;
}) => {
  const [page, setPage] = useState(1);

  const apiUrl =
    searchQuery !== ""
      ? `${apiHostUrl}/holidaze/venues/search?q=${encodeURIComponent(
          searchQuery
        )}&limit=30&page=${page}&sort=${sortField}&sortOrder=${sortOrder}`
      : `${apiHostUrl}/holidaze/venues?limit=30&page=${page}&sort=${sortField}&sortOrder=${sortOrder}`;

  const { response, isLoading, isError, errorMessage } =
    useApi<Venue[]>(apiUrl);

  const venues = response?.data || [];
  const meta = response?.meta;

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortField, sortOrder]);

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

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <P>
        <ErrorMessage message={errorMessage} />
      </P>
    );
  }

  return (
    <VenuesData
      venues={venues}
      meta={
        meta || {
          currentPage: 0,
          pageCount: 0,
          totalCount: 0,
          isFirstPage: true,
          isLastPage: true
        }
      }
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
    />
  );
};

export default Venues;
