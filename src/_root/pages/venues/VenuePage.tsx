import { useState } from "react";
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

  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false
  });

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
            className="custom-scrollbarVenue flex md:flex flex-col gap-2 px-6 py-6 md:min-w-[220px] md:max-w-[270px] bg-customBg dark:bg-customBgDark 
            md:h-screen md:max-h-screen w-screen relative h-10 z-30 md:sticky md:top-16 md:overflow-y-auto pb-32"
          >
            <H1 className="text-2xl font-bold mb-4">Venues</H1>
            <div className="flex flex-row md:flex-col flex-wrap gap-1 md:gap-2 max-w-screen">
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
          </div>

          {/* Right-side content */}
          <div className="flex flex-1 overflow-auto">
            <div className="relative flex flex-col flex-1 gap-2 my-1 px-2 custom-scrollbar max-w-4xl 2xl:max-w-7xl">
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
