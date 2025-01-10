import Button from "../../../components/shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faDog,
  faParking,
  faStar,
  faWifi
} from "@fortawesome/free-solid-svg-icons";
import H2 from "../../../components/shared/Typography/H2";
import P from "../../../components/shared/Typography/P";
import { Venue } from "../../../components/library/types";
import ErrorMessage from "../../../components/shared/ErrorMessage";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white shadow-md rounded-lg overflow-hidden group transform transition-transform"
            >
              <img
                src={
                  venue.media?.length > 0
                    ? venue.media[0].url
                    : "https://via.placeholder.com/300x200"
                }
                alt={venue.media?.[0]?.alt || "Venue Image"}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <H2 className="text-sm md:text-base font-semibold truncate">
                    {venue.name}
                  </H2>
                  <div className="text-sm text-customBgDark-900 dark:text-whiteFont-500">
                    <FontAwesomeIcon
                      icon={faStar}
                      size="sm"
                      className="mr-2 my-0"
                    />
                    {venue.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {venue.location.city}, {venue.location.country}
                </p>
                <p className="text-gray-800 font-bold mb-2">
                  Price: ${venue.price} / night
                </p>
                <p className="text-gray-700 mb-4">
                  Max Guests: {venue.maxGuests}
                </p>
                <ul className="flex flex-wrap gap-4 mb-4">
                  {venue.meta.wifi && (
                    <li className="flex flex-col items-center text-gray-600">
                      <FontAwesomeIcon
                        icon={faWifi}
                        size="1x"
                        className="w-6 h-6 p-2"
                      />
                      <span className="text-xs">WiFi</span>
                    </li>
                  )}
                  {venue.meta.parking && (
                    <li className="flex flex-col items-center text-gray-600">
                      <FontAwesomeIcon
                        icon={faParking}
                        size="lg"
                        className="w-6 h-6 p-2"
                      />
                      <span className="text-xs">Parking</span>
                    </li>
                  )}
                  {venue.meta.breakfast && (
                    <li className="flex flex-col items-center text-gray-600">
                      <FontAwesomeIcon
                        icon={faCoffee}
                        size="lg"
                        className="w-6 h-6 p-2"
                      />
                      <span className="text-xs">Breakfast</span>
                    </li>
                  )}
                  {venue.meta.pets && (
                    <li className="flex flex-col items-center text-gray-600">
                      <FontAwesomeIcon
                        icon={faDog}
                        size="lg"
                        className="w-6 h-6 p-2"
                      />
                      <span className="text-xs">Pets</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
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
