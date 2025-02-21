import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCar,
  faPaw,
  faStar,
  faWifi,
  faUserFriends,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import H2 from "../../../components/shared/Typography/H2";
import P from "../../../components/shared/Typography/P";
import { Venue } from "../../../components/library/types";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import { Link } from "react-router-dom";
import VenueSwiper from "../../../components/VenueSwiper";
import "./VenuesData.css";
import VenuePagination from "./VenuePaginationData";

interface VenuesDataProps {
  venues: Venue[];
  meta: {
    currentPage: number;
    pageCount: number;
    totalCount: number;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
  goToSelPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

/**
 * VenuesData Component
 * - Displays a list of venues in a grid layout.
 * - Uses `VenueSwiper` for the venue images.
 * - @component
 * @returns {JSX.Element} The VenuesData component.
 */

const VenuesData: React.FC<VenuesDataProps> = ({
  venues,
  meta,
  goToSelPage,
  goToNextPage,
  goToPreviousPage
}) => {
  // Add state for visible venues and fade in/out effect
  const [visibleVenues, setVisibleVenues] = useState<Venue[]>([]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    setTimeout(() => {
      setVisibleVenues(venues);
      setFade(false);
    }, 300);
  }, [venues]);

  return (
    <div className="relative">
      {/* No Results Message */}
      {venues.length === 0 && (
        <ErrorMessage className="min-h-20 text-xl font-semibold text-gray-800 dark:text-white my-10">
          <H2 className="md:text-xl font-semibold text-gray-800 dark:text-white">
            No Matching Results
          </H2>
          <P className="text-base font-normal pt-2 pb-6 text-balance max-w-3xl text-center">
            We couldn’t find any venues matching your search criteria. Try
            adjusting your search or browsing all available venues.
          </P>
        </ErrorMessage>
      )}

      {/* Venues Grid */}
      {venues.length > 0 && (
        <div
          className={`grid grid-cols-1 mx-2 md:mx-6 gap-5 ${
            fade ? "fade-out" : "fade-in"
          }`}
        >
          {visibleVenues.map((venue) => (
            <Link to={`/venue/${venue.id}`} key={venue.id} className="">
              <div
                key={venue.id}
                className="sm:flex bg-white dark:bg-customBgDark-500 shadow-sm rounded-lg overflow-hidden group transition-transform transform scale-95 hover:scale-100 fade-in-up"
              >
                <div className="w-full h-52 sm:h-60 sm:w-[24vw]">
                  <VenueSwiper media={venue.media} />
                </div>
                <div className="p-4 w-full flex flex-1 flex-col justify-between">
                  <div>
                    {/* Venue Name and Rating */}
                    <div className="flex justify-between items-center">
                      <H2 className="text-sm md:text-base font-semibold truncate">
                        {venue.name}
                      </H2>
                      <div className="ml-2 text-sm text-gray-700 dark:text-whiteFont-500 whitespace-nowrap flex items-center">
                        <FontAwesomeIcon
                          icon={faStar}
                          size="sm"
                          className="mr-2 my-0"
                        />
                        {venue.rating}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      {(venue.location.city || venue.location.country) && (
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="mr-2 text-gray-500 w-3 h-3 px-1"
                          />
                          <P className="text-gray-600 text-xs">
                            {[venue.location.city, venue.location.country]
                              .filter(Boolean)
                              .join(", ")}
                          </P>
                        </div>
                      )}
                    </div>

                    {/* Icons */}
                    <ul className="flex flex-wrap gap-4 mt-2 mb-3">
                      {venue.meta.wifi && (
                        <li className="flex flex-col items-center text-gray-800 dark:text-whiteFont-700">
                          <FontAwesomeIcon
                            icon={faWifi}
                            size="xs"
                            className="w-4 h-4 p-1"
                          />
                          <P className="text-xs">Wifi</P>
                        </li>
                      )}
                      {venue.meta.parking && (
                        <li className="flex flex-col items-center text-gray-800 dark:text-whiteFont-700">
                          <FontAwesomeIcon
                            icon={faCar}
                            size="xs"
                            className="w-4 h-4 p-1"
                          />
                          <P className="text-xs">Parking</P>
                        </li>
                      )}
                      {venue.meta.breakfast && (
                        <li className="flex flex-col items-center text-gray-800 dark:text-whiteFont-700">
                          <FontAwesomeIcon
                            icon={faUtensils}
                            size="xs"
                            className="w-4 h-4 p-1"
                          />
                          <P className="text-xs">Breakfast</P>
                        </li>
                      )}
                      {venue.meta.pets && (
                        <li className="flex flex-col items-center text-gray-800 dark:text-whiteFont-700">
                          <FontAwesomeIcon
                            icon={faPaw}
                            size="xs"
                            className="w-4 h-4 p-1"
                          />
                          <P className="text-xs">Pets</P>
                        </li>
                      )}
                    </ul>
                  </div>
                  {/* Description */}
                  <P className="text-gray-700 dark:text-whiteFont-500 text-sm text-balance my-2">
                    {venue.description.length > 100
                      ? venue.description.substring(0, 90) + "..."
                      : venue.description}
                  </P>
                  {/* Max Guests and Price at the Bottom */}
                  <div className="md:mt-auto flex justify-between">
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <FontAwesomeIcon
                        icon={faUserFriends}
                        className="mr-2 w-4 h-4 p-1 text-gray-500"
                      />
                      <P className="text-sm">Max Guests: {venue.maxGuests}</P>
                    </div>
                    <div className="flex justify-end text-lg">
                      <P className="text-black dark:text-whiteFont-200">
                        {venue.price} kr{" "}
                        <span className="text-sm text-gray-800 dark:text-whiteFont-700">
                          / night
                        </span>
                      </P>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {venues.length > 0 && meta && (
        <VenuePagination
          currentPage={meta.currentPage}
          pageCount={meta.pageCount}
          totalCount={meta.totalCount}
          goToSelPage={goToSelPage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      )}
    </div>
  );
};

export default VenuesData;
