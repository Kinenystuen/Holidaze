import { useState, useEffect } from "react";
import { useApi } from "../../../components/hooks/UseApi";
import { apiHostUrl } from "../../../components/library/constants";
import { Venue } from "../../../components/library/types";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import Loader from "../../../components/ui/Loader";
import VenuesData from "./VenuesData";
import P from "../../../components/shared/Typography/P";

const Venues = ({ searchQuery }: { searchQuery: string }) => {
  const [page, setPage] = useState(1);

  const apiUrl =
    searchQuery !== ""
      ? `${apiHostUrl}/holidaze/venues/search?q=${encodeURIComponent(
          searchQuery
        )}&limit=30&page=${page}`
      : `${apiHostUrl}/holidaze/venues?limit=30&page=${page}`;

  const { response, isLoading, isError, errorMessage } =
    useApi<Venue[]>(apiUrl);

  const venues = response?.data || [];
  const meta = response?.meta;

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

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
    console.log("Loading...");
    return <Loader />;
  }

  if (isError) {
    console.log("Error:", errorMessage);
    return (
      <P>
        <ErrorMessage message={errorMessage} />
      </P>
    );
  }

  return (
    <>
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
    </>
  );
};

export default Venues;
