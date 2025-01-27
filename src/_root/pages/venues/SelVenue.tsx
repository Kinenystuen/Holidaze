import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Venue } from "../../../components/library/types";
import H1 from "../../../components/shared/Typography/H1";
import {
  faCar,
  faCoffee,
  faMapMarkerAlt,
  faPaw,
  faPerson,
  faStar,
  faUsers,
  faWifi,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import P from "../../../components/shared/Typography/P";
import "swiper/swiper-bundle.css";
import "./SelVenue.css";
import SelVenueSwiper from "../../../components/SelVenueSwiper";
import { Link } from "react-router-dom";
import React from "react";
import SelVenueBooking from "../../../components/SelVenueBooking";

/** Small Feature Box */
const Feature = ({ icon, text }: { icon: IconDefinition; text: string }) => (
  <div className="flex items-center gap-2 py-1 ">
    <FontAwesomeIcon icon={icon} className="text-color1-200 w-5 h-5" />
    <P>{text}</P>
  </div>
);

interface SelVenueProps {
  venue: Venue;
  refetchVenue: () => void;
}

const SelVenue: React.FC<SelVenueProps> = ({
  venue,
  refetchVenue: fetchData
}) => {
  return (
    <div className="flex-1">
      <div className="">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Swiper Container */}
          <SelVenueSwiper venue={venue.media} />

          {/* Right Column: Booking Details */}
          <div className="md:col-span-1 flex flex-col gap-1 ">
            {/* Location */}
            <div className="flex items-center text-sm text-gray-600 md:my-2">
              {venue.location ? (
                <div className="flex items-center mx-2 px-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="mr-2 text-gray-500 w-5 h-5 px-1"
                  />
                  <P className="text-gray-600 text-sm">
                    {[
                      venue.location.address,
                      venue.location.zip,
                      venue.location.city,
                      venue.location.country
                    ]
                      .filter(Boolean)
                      .join(", ") || "Location not available"}
                  </P>
                </div>
              ) : (
                <P className="text-gray-500 italic">Location not available</P>
              )}
            </div>
            {(venue.meta.wifi ||
              venue.meta.parking ||
              venue.meta.breakfast ||
              venue.meta.pets) && (
              <hr className="hidden md:block border-color2-500 dark:border-customBgDark-500 my-3" />
            )}

            <div className="flex-grow">
              {/* Icons */}
              <div className="mx-2 px-3 hidden md:grid grid-cols-1 gap-3 text-gray-700">
                {venue?.meta.wifi && <Feature icon={faWifi} text="Wi-Fi" />}
                {venue?.meta.parking && <Feature icon={faCar} text="Parking" />}
                {venue?.meta.breakfast && (
                  <Feature icon={faCoffee} text="Breakfast" />
                )}
                {venue?.meta.pets && (
                  <Feature icon={faPaw} text="Pets Allowed" />
                )}
              </div>
              <hr className="border-color2-500 dark:border-customBgDark-500 hidden md:block my-3" />
              <div className="hidden md:flex flex-col gap-4 items-start justify-between p-1 mb-3 mx-3 px-2">
                <Feature
                  icon={faUsers}
                  text={`Max Guests: ${venue.maxGuests}`}
                />
              </div>
            </div>
            <hr className="border-color2-500 dark:border-customBgDark-500 hidden md:block my-3" />
            <div className="hidden md:flex flex-col gap-4 items-start justify-between p-1 mb-3 px-2">
              {/* Owner Details Section */}
              <Link
                to={`/profile/${encodeURIComponent(venue.owner.name)}`}
                className="flex items-center gap-5 cursor-pointer"
              >
                {/* Owner Avatar */}
                <img
                  src={venue.owner.avatar?.url}
                  alt={`Avatar of ${venue.owner.name}`}
                  className="w-14 h-14 rounded-full object-cover shadow-md"
                />

                {/* Owner Info */}
                <div className="flex flex-col">
                  <P className="text-lg text-gray-800 dark:text-whiteFont-400">
                    Hosted by{" "}
                    <span className="font-semibold">{venue.owner.name}</span>
                  </P>
                  <P className="text-[12px] text-gray-500 dark:text-whiteFont-600">
                    {venue.owner.email || "No email provided"}
                  </P>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Venue Details */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
          {/* Left Column: Description & Features */}
          <div className="md:col-span-2">
            {/* Venue Title & Rating */}
            <div className="flex justify-between items-center flex-wrap mt-4 mb-1">
              <H1>{venue?.name}</H1>
              {/* Rating Container */}
              <div className="flex items-center p-1 gap-2">
                <FontAwesomeIcon icon={faStar} className="w-5 h-5" />
                <span className="text-lg font-medium">{venue.rating}</span>
              </div>
            </div>

            <P className="text-lg text-gray-600">{venue?.description}</P>

            <div className="mt-6 grid md:hidden grid-cols-2 gap-4 mx-2 mb-6 text-gray-700">
              {venue?.meta.wifi && <Feature icon={faWifi} text="Wi-Fi" />}
              {venue?.meta.parking && <Feature icon={faCar} text="Parking" />}
              {venue?.meta.breakfast && (
                <Feature icon={faCoffee} text="Breakfast" />
              )}
              {venue?.meta.pets && <Feature icon={faPaw} text="Pets Allowed" />}
            </div>
            <hr className="md:hidden border-color2-500 dark:border-customBgDark-500 my-3" />
            <div className="flex md:hidden flex-col gap-4 items-start justify-between p-1 mb-3 px-2">
              <Feature
                icon={faPerson}
                text={`Max Guests: ${venue.maxGuests}`}
              />
            </div>

            {/* Rating Badge */}
            {venue.rating === 5 && (
              <div className="relative border border-color1-200 bg-color2-500 dark:bg-color1-600 dark:border-color3 p-6 my-10 mx-8 rounded-lg shadow-lg">
                {/* Badge */}
                <div className="absolute -top-3 left-4 bg-color1-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  ★ 5.0 - Guest Favorite
                </div>

                {/* Content */}
                <div className="flex flex-row items-center gap-4">
                  <div className="flex items-center gap-4 border-r border-color1-200 pr-4">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-gray-800 dark:text-whiteFont-500 w-8 h-8"
                    />

                    {/* Text Section */}
                    <div>
                      <P className="text-lg font-semibold text-gray-900 dark:text-whiteFont-500">
                        Highly Rated by Guests
                      </P>
                      <P className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Guests love staying here! This venue has consistently
                        received 5-star ratings for its exceptional service,
                        comfort, and hospitality.
                      </P>
                    </div>
                  </div>
                  <div
                    title="Fake link O:)"
                    className="text-center cursor-pointer mx-2 text-sm font-extrabold"
                  >
                    6 ratings
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Right Column: Booking Details */}
          <SelVenueBooking venue={venue} refetchVenue={fetchData} />

          {/* Owner Details Section 2*/}
          <hr className="md:hidden border-color2-500 dark:border-customBgDark-500 my-3" />
          <div className="flex md:hidden flex-col gap-4 items-start justify-between p-1 my-6 mb-10 px-2">
            <Link
              to={`/profile/${encodeURIComponent(venue.owner.name)}`}
              className="flex items-center gap-5 cursor-pointer"
            >
              {/* Owner Avatar */}
              <img
                src={venue.owner.avatar?.url}
                alt={`Avatar of ${venue.owner.name}`}
                className="w-14 h-14 rounded-full object-cover shadow-md"
              />

              {/* Owner Info */}
              <div className="flex flex-col">
                <P className="text-lg font-semibold text-gray-800 dark:text-whiteFont-400">
                  Hosted by {venue.owner.name}
                </P>
                <P className="text-[12px] text-gray-500 dark:text-whiteFont-600">
                  {venue.owner.email || "No email provided"}
                </P>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelVenue;
