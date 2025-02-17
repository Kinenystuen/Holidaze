import { useEffect, useState } from "react";
import {
  UsersResponse,
  UserProfile,
  PaginationMeta
} from "../../../components/library/types";
import { useApi } from "../../../components/hooks/UseApi";
import { apiHostUrl } from "../../../components/library/constants";
import Loader from "../../../components/ui/Loader";
import P from "../../../components/shared/Typography/P";
import { Link, useSearchParams } from "react-router-dom";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import Button from "../../../components/shared/Button/Button";
import MetaTags from "../../../components/metaTags";
import Breadcrumb from "../../../components/ui/BreadCrumbItem";
import { useUserContext } from "../../../components/context/useUserContext";
import ProfilesDisplay from "./ProfilesDisplay";
import SearchBar from "../venues/SearchBarVen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import VenuePagination from "../venues/VenuePaginationData";

const defaultMeta: PaginationMeta = {
  isFirstPage: true,
  isLastPage: true,
  currentPage: 1,
  previousPage: null,
  nextPage: null,
  pageCount: 1,
  totalCount: 0
};

const ProfilesPage = () => {
  const { isAuthenticated } = useUserContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // State for filters and pagination
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("search") || ""
  );
  const [isVenueManager, setIsVenueManager] = useState<boolean>(
    searchParams.get("venueManager") === "true"
  );
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  // State for data and metadata
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([]);
  const [metaData, setMetaData] = useState<PaginationMeta>(defaultMeta);

  // Fetch all profiles (pagination included)
  const { response, isLoading, isError, errorMessage, fetchData } =
    useApi<UsersResponse>(
      `${apiHostUrl}/holidaze/profiles?page=${page}&_bookings=true&_venues=true`
    );

  // Fetch searched profiles
  const {
    response: searchResponse,
    isLoading: isSearching,
    fetchData: searchProfiles
  } = useApi<UsersResponse>(
    searchQuery.trim()
      ? `${apiHostUrl}/holidaze/profiles/search?page=${page}&q=${searchQuery}`
      : `${apiHostUrl}/holidaze/profiles?page=${page}&_bookings=true&_venues=true`,
    {},
    false
  );

  // Fetch Data: Runs on page change or search change
  useEffect(() => {
    if (searchQuery.trim()) {
      searchProfiles();
    } else {
      fetchData();
    }
  }, [page, fetchData, searchProfiles, searchQuery]);

  useEffect(() => {
    if (response?.data && !searchQuery.trim()) {
      setProfiles(response.data as unknown as UserProfile[]);
      setMetaData(response.meta || defaultMeta);
    }
  }, [response, searchQuery]);

  useEffect(() => {
    if (searchResponse?.data) {
      const fetchedProfiles = searchResponse.data as unknown as UserProfile[];
      setProfiles(fetchedProfiles);
      setMetaData(searchResponse.meta || defaultMeta);

      if (fetchedProfiles.length > metaData.totalCount) {
        setPage(1);
      }
    }
  }, [searchResponse, metaData.totalCount]);

  useEffect(() => {
    let updatedProfiles = [...profiles];

    if (isVenueManager) {
      updatedProfiles = updatedProfiles.filter(
        (profile) => profile.venueManager
      );
    }

    setFilteredProfiles(updatedProfiles);
  }, [profiles, isVenueManager]);

  // Handle Search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateSearchParams({ search: query });
    searchProfiles();
  };

  const handleVenueManagerFilter = (checked: boolean) => {
    setIsVenueManager(checked);
    updateSearchParams({ venueManager: checked ? "true" : "", page: "1" });

    setPage(1);
  };

  // Handle Pagination
  const goToSelPage = (newPage: number) => {
    setPage(newPage);
    updateSearchParams({ page: newPage.toString() });

    if (searchQuery.trim()) {
      searchProfiles();
    } else {
      fetchData();
    }
  };

  const goToNextPage = () => {
    if (metaData.nextPage) goToSelPage(metaData.currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (metaData.previousPage) goToSelPage(metaData.currentPage - 1);
  };

  // Update Search Params in URL
  const updateSearchParams = (newParams: { [key: string]: string }) => {
    const updatedParams = new URLSearchParams(searchParams);
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        updatedParams.set(key, newParams[key]);
      } else {
        updatedParams.delete(key);
      }
    });
    setSearchParams(updatedParams, { replace: true });
  };

  if (!isAuthenticated) {
    return (
      <ErrorMessage message="Log in to view profiles">
        <P>If you don't have an account, you can create one for free.</P>
        <Link to="/auth" className="w-60">
          <Button buttonType="violet" className="my-5 px-4 inline-block w-full">
            Log in
          </Button>
        </Link>
      </ErrorMessage>
    );
  }

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorMessage message="Profiles not found">
        <P>{errorMessage}</P>
        <Link to="/profiles">
          <Button buttonType="violet" className="my-5 px-4 inline-block">
            Go back to profiles
          </Button>
        </Link>
      </ErrorMessage>
    );

  return (
    <div>
      <MetaTags
        title="Profiles - Holidaze"
        keywords="Holidaze, venue, hotel, booking, profiles"
        description="Browse user profiles on Holidaze."
      />
      <div className="container max-w-screen-xl mx-auto px-5 md:px-10">
        <Breadcrumb
          items={[
            { label: "", href: "/" },
            { label: "Profiles", href: "/profiles", current: true }
          ]}
        />
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 py-2">
          <SearchBar
            onSearch={handleSearch}
            searchPlaceholder="Search for profiles..."
          />
          {/* Venue Manager Checkbox Filter */}
          <div className="flex w-fit items-center gap-2 bg-white dark:bg-customBgDark-500 p-2 py-3 rounded-lg shadow-md border border-gray-200 dark:border-customBgDark-600">
            <label
              htmlFor="venueManager"
              className="flex items-center cursor-pointer"
            >
              <div className="relative w-5 h-5">
                <input
                  type="checkbox"
                  id="venueManager"
                  checked={isVenueManager}
                  onChange={(e) => handleVenueManagerFilter(e.target.checked)}
                  className="peer hidden"
                />
                <div className="w-full h-full border-2 border-gray-400 rounded-md peer-checked:bg-color1-500 peer-checked:border-color1-500 peer-hover:bg-color1-400  flex items-center justify-center transition-all duration-200">
                  {isVenueManager && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white w-3 h-3"
                    />
                  )}
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-700 dark:text-whiteFont-500">
                Show only Venue Managers
              </span>
            </label>
          </div>
        </div>
        {/* Profiles Display */}
        {isSearching ? (
          <Loader />
        ) : (
          <ProfilesDisplay profiles={filteredProfiles} />
        )}

        <VenuePagination
          currentPage={metaData.currentPage}
          pageCount={metaData.pageCount}
          totalCount={metaData.totalCount}
          goToSelPage={goToSelPage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          paginationType="Profiles"
        />
      </div>
    </div>
  );
};

export default ProfilesPage;
