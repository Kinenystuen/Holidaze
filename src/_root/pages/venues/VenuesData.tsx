import Button from "../../../components/shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faDog,
  faMapMarkerAlt,
  faParking,
  faStar,
  faUserFriends,
  faWifi
} from "@fortawesome/free-solid-svg-icons";
import H2 from "../../../components/shared/Typography/H2";
import P from "../../../components/shared/Typography/P";
import { Venue } from "../../../components/library/types";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import { Link } from "react-router-dom";

interface VenuesDataProps {
  venues: Venue[];
  meta: {
    currentPage: number;
    pageCount: number;
    totalCount: number;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const VenuesData: React.FC<VenuesDataProps> = ({
  venues,
  meta,
  goToNextPage,
  goToPreviousPage
}) => {
  return (
    <div>
      {/* No Results Message */}
      {venues.length === 0 && (
        <ErrorMessage
          className="min-h-20 text-xl font-semibold text-gray-800 dark:text-white text-n my-10"
          icon={false}
        >
          <H2 className="md:text-xl font-semibold text-gray-800 dark:text-white">
            No Matching Results
          </H2>
          <P className="text-base font-normal pt-2 pb-6 text-balance max-w-3xl text-center  ">
            We couldn’t find any venues matching your search criteria. Try
            adjusting your search or browsing all available venues.
          </P>
        </ErrorMessage>
      )}

      {/* Venues Grid */}
      {venues.length > 0 && (
        <div className="grid grid-cols-1 gap-5">
          {venues.map((venue) => (
            <Link
              to={`/venue/${venue.id}`}
              key={venue.id}
              className="hover:no-underline"
            >
              <div
                key={venue.id}
                className="sm:flex bg-white dark:bg-customBgDark-500 shadow-sm rounded-lg overflow-hidden group transform transition-transform"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      venue.media?.length > 0
                        ? venue.media[0].url
                        : "https://via.placeholder.com/300x200"
                    }
                    alt={venue.media?.[0]?.alt || "Venue Image"}
                    className="w-full h-52 sm:w-72 lg:w-80 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 w-full  flex flex-col justify-between">
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
                    <div className="flex items-center text-sm text-gray-600 mt-[-4px]">
                      {(venue.location.city || venue.location.country) && (
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="mr-2 text-gray-500 w-3 h-3 px-1"
                          />
                          <P className="text-gray-600 text-[10px]">
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
                            icon={faParking}
                            size="xs"
                            className="w-4 h-4 p-1"
                          />
                          <P className="text-xs">Parking</P>
                        </li>
                      )}
                      {venue.meta.breakfast && (
                        <li className="flex flex-col items-center text-gray-800 dark:text-whiteFont-700">
                          <FontAwesomeIcon
                            icon={faCoffee}
                            size="xs"
                            className="w-4 h-4 p-1"
                          />
                          <P className="text-xs">Breakfast</P>
                        </li>
                      )}
                      {venue.meta.pets && (
                        <li className="flex flex-col items-center text-gray-800 dark:text-whiteFont-700">
                          <FontAwesomeIcon
                            icon={faDog}
                            size="xs"
                            className="w-4 h-4 p-1"
                          />
                          <P className="text-xs">Pets</P>
                        </li>
                      )}
                    </ul>
                  </div>

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

      {/* Pagination Info */}
      {venues.length > 0 && meta && (
        <div className="mt-4">
          <P>
            Page {meta.currentPage} of {meta.pageCount}
          </P>
          <P>Total venues: {meta.totalCount}</P>
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={goToPreviousPage}
              disabled={meta.isFirstPage}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50"
            >
              Previous
            </Button>
            <p className="text-gray-600">
              Page {meta.currentPage} of {meta.pageCount}
            </p>
            <Button
              onClick={goToNextPage}
              disabled={meta.isLastPage}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenuesData;
