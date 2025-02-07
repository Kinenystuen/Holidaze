import React from "react";
import { Link } from "react-router-dom";
import { Venue } from "../library/types";
import VenueSwiper from "../VenueSwiper";
import H2 from "../shared/Typography/H2";
import P from "../shared/Typography/P";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faMapMarkerAlt,
  faPaw,
  faStar,
  faUserFriends,
  faUtensils,
  faWifi
} from "@fortawesome/free-solid-svg-icons";

interface UserVenuesProps {
  venues: Venue[];
}

const UserVenues: React.FC<UserVenuesProps> = ({ venues }) => {
  return (
    <div className="container mx-auto px-4 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <Link
            key={venue.id}
            to={`/venue/${venue.id}`}
            className="flex flex-col bg-white dark:bg-customBgDark-500 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Image */}
            <div className="h-52">
              <VenueSwiper media={venue.media} />
            </div>
            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
              {/* Top info */}
              <div>
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
              <P className="text-gray-700 dark:text-whiteFont-500 text-sm text-balance capitalize my-2 flex-1">
                {venue.description.length > 100
                  ? venue.description.substring(0, 100) + "..."
                  : venue.description}
              </P>
              {/* Bottom info */}
              <div className="flex justify-between">
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserVenues;
