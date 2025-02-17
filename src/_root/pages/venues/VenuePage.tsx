import { useEffect, useState } from "react";
import H1 from "../../../components/shared/Typography/H1";
import SearchBar from "./SearchBarVen";
import Venues from "./venues";
import { useSearchParams } from "react-router-dom";
import SortMenu from "./SortMenu";
import FilterMenu from "./FilterMenu";
import "./VenuePage.css";
import ScrollToTopBtn from "../../../components/ui/ScrollToTopBtn";
import MetaTags from "../../../components/metaTags";

const VenuePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  const [sortField, setSortField] = useState<string>("price");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false
  });

  useEffect(() => {
    setSortField("price");
    setSortOrder("asc");
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete("search");
      setSearchParams(updatedParams, { replace: true });
    } else {
      setSearchParams({ search: query }, { replace: true });
    }
  };

  return (
    <div className="relative container mx-auto min-w-full">
      <MetaTags
        title={`Venues - Holidaze`}
        keywords="holidaze, venue, hotel, booking, holiday, vacation"
        description={`Book your stay at Holidaze. Enjoy great amenities and a wonderful experience!`}
      />
      <div className=" mx-auto max-w-7xl">
        <div className="w-full md:flex">
          {/* Left-side menu */}
          <div
            className="hidden md:flex flex-col gap-2 px-6 py-6 md:min-w-[220px] max-w-[270px] bg-dark-2 
            h-screen max-h-screen sticky top-16 overflow-y-auto custom-scrollbar pb-32"
          >
            <H1 className="text-2xl font-bold mb-4">Venues</H1>
            <SearchBar onSearch={handleSearch} />

            <SortMenu
              key={`${sortField}-${sortOrder}`}
              sortField={sortField}
              sortOrder={sortOrder}
              onSortChange={(field, order) => {
                setSortField(field);
                setSortOrder(order);
              }}
            />

            <hr className="border-t border-color1-200 dark:border-color1-500 my-4" />
            <FilterMenu
              filters={filters}
              onFilterChange={(newFilters) => setFilters(newFilters)}
            />
          </div>

          {/* Right-side content */}
          <div className="flex flex-1 overflow-auto">
            <div className="relative flex flex-col flex-1 gap-2 my-1 px-2 custom-scrollbar max-w-4xl 2xl:max-w-7xl">
              {/* Search Bar */}

              <div
                className={`bg-inherit dark:bg-inherit md:bg-transparent dark:md:bg-transparent z-20 w-full py-0 px-4`}
              >
                <div className="flex gap-2 py-2 md:hidden">
                  <SearchBar
                    onSearch={handleSearch}
                    searchPlaceholder="Search for venues..."
                  />
                  <div className="flex">
                    <FilterMenu
                      filters={filters}
                      boxPosition="right-0"
                      onFilterChange={(newFilters) => setFilters(newFilters)}
                    />
                    <SortMenu
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSortChange={(field, order) => {
                        setSortField(field);
                        setSortOrder(order);
                      }}
                    />
                  </div>
                </div>
              </div>

              <ScrollToTopBtn />
              {/* Venues Section */}
              <Venues
                searchQuery={searchQuery}
                sortField={sortField}
                sortOrder={sortOrder}
                filters={filters}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenuePage;
