import { useState } from "react";
import H1 from "../../../components/shared/Typography/H1";
import SearchBar from "./SearchBarVen";
import Venues from "./venues";
import { useSearchParams } from "react-router-dom";
import SortMenu from "./SortMenu";
import FilterMenu from "./FilterMenu";
import "./VenuePage.css";

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
      <div className=" mx-auto max-w-7xl">
        <div className="w-full md:flex">
          {/* Left-side menu */}
          <div className="hidden md:flex flex-col gap-2 px-6 py-6 md:min-w-[220px] max-w-[270px] bg-dark-2 h-screen sticky top-0  custom-scrollbar">
            <H1 className="text-2xl font-bold mb-4">Venues</H1>
            <FilterMenu
              filters={filters}
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

          {/* Right-side content */}
          <div className="flex flex-1 overflow-auto">
            <div className="flex flex-col flex-1 gap-2 my-4 px-2 custom-scrollbar max-w-4xl 2xl:max-w-7xl">
              <div className="flex justify-between items-center mb-4 gap-2">
                <SearchBar onSearch={handleSearch} />
                <div className="flex md:hidden">
                  <FilterMenu
                    filters={filters}
                    boxPosition="right-0"
                    onFilterChange={(newFilters) => setFilters(newFilters)}
                  />
                  <SortMenu
                    sortField={sortField}
                    sortOrder={sortOrder}
                    boxPosition="right-0"
                    onSortChange={(field, order) => {
                      setSortField(field);
                      setSortOrder(order);
                    }}
                  />
                </div>
              </div>
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
