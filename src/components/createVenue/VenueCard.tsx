import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import H2 from "../shared/Typography/H2";
import {
  faArrowRight,
  faCar,
  faChevronDown,
  faEdit,
  faInfoCircle,
  faMapMarkerAlt,
  faPaw,
  faStar,
  faTrash,
  faUserFriends,
  faUtensils,
  faWifi
} from "@fortawesome/free-solid-svg-icons";
import P from "../shared/Typography/P";
import { useDeleteVenue } from "../hooks/UseDeleteVenue";
import Button from "../shared/Button/Button";
import ButtonDropdown from "../ButtonDropdown";
import { Venue } from "../library/types";
import LoaderSmall from "../ui/LoaderSmall";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiHostUrl } from "../library/constants";
import { useApi } from "../hooks/UseApi";
import { FormatDate } from "../ui/FormatDate";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import EditVenue from "./EditVenue";

const VenueCard = ({
  venue,
  refetchVenue
}: {
  venue: Venue;
  refetchVenue: () => void;
}) => {
  const { deleteVenue, isLoading } = useDeleteVenue(venue.id);
  const [bookings, setBookings] = useState<Venue | null>(null);
  const [expandedVenue, setExpandedVenue] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch venue data
  const { response } = useApi<Venue>(
    `${apiHostUrl}/holidaze/venues/${venue.id}?_owner=true&_bookings=true`
  );

  // Update state when response is available
  useEffect(() => {
    if (response?.data) {
      setBookings(response.data);
    }
  }, [response]);

  console.log(bookings);

  // Toggle accordion
  const toggleDropdown = (venueId: string) => {
    setExpandedVenue(expandedVenue === venueId ? null : venueId);
  };

  const handleEditVenue = () => {
    setIsEditing(true);
  };

  const handleDeleteVenue = async () => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      await deleteVenue();
      refetchVenue();
    }
  };

  const Feature = ({ icon, text }: { icon: IconDefinition; text: string }) => (
    <li className="flex items-center space-x-2 text-gray-800 dark:text-gray-300 text-sm">
      <FontAwesomeIcon icon={icon} className="w-4 h-4 text-whiteFont-600" />
      <P>{text}</P>
    </li>
  );

  return (
    <>
      {/* Show Loader if deleting */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-40">
          <LoaderSmall />
        </div>
      ) : (
        <>
          {/* Venue Card */}
          <div
            key={venue.id}
            className="flex flex-col md:flex-row h-fit bg-white col-span-1 md:col-span-1 dark:bg-customBgDark-500 rounded-xl shadow-sm border border-gray-200 dark:border-customBgDark-600 "
          >
            {/* Venue Image */}
            <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden rounded-t-lg lg:rounded-none lg:rounded-l-lg">
              <img
                src={venue.media[0]?.url || "/placeholder.jpg"}
                alt={venue.media[0]?.alt || "Venue Image"}
                className="w-full h-full object-cover overflow-hidden"
              />
            </div>

            {/* Venue Details */}
            <div className="p-5 flex flex-col justify-between w-full">
              {/* Name & Location */}
              <div>
                <div className="flex justify-between items-center">
                  <H2 className="text-lg font-semibold truncate">
                    {venue.name}
                  </H2>
                  <div className="">
                    <FontAwesomeIcon icon={faStar} className="mr-1" />
                    {venue.rating}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mt-1">
                  {venue.location.city || venue.location.country ? (
                    <>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="mr-2 text-whiteFont-800 w-4 h-4"
                      />
                      <P>
                        {[venue.location.city, venue.location.country]
                          .filter(Boolean)
                          .join(", ")}
                      </P>
                    </>
                  ) : (
                    <P className="italic text-gray-400">
                      No location available
                    </P>
                  )}
                </div>
              </div>

              {/* Amenities */}
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {venue.meta.wifi && <Feature icon={faWifi} text="Wifi" />}
                {venue.meta.parking && <Feature icon={faCar} text="Parking" />}
                {venue.meta.breakfast && (
                  <Feature icon={faUtensils} text="Breakfast" />
                )}
                {venue.meta.pets && (
                  <Feature icon={faPaw} text="Pets Allowed" />
                )}
              </ul>

              {/* Description */}
              <P className="text-gray-600 dark:text-gray-300 text-sm mt-3 line-clamp-2">
                {venue.description}
              </P>

              {/* Guests & Price */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    className="mr-2 w-4 h-4 text-whiteFont-800"
                  />
                  <P>Max {venue.maxGuests} guests</P>
                </div>
                <P className="text-lg font-semibold text-black dark:text-gray-200">
                  {venue.price} kr
                  <span className="text-sm text-whiteFont-800"> / night</span>
                </P>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4 justify-start lg:justify-end flex-wrap">
                <Button
                  buttonType="violetSecondary"
                  className="w-full xs:w-fit transform duration-500"
                  onClick={() => toggleDropdown(venue.id)}
                >
                  {bookings?.bookings.length === 1
                    ? `${expandedVenue ? "Hide" : "View"} Booking`
                    : `${expandedVenue ? "Hide" : "View"} Bookings`}{" "}
                  ({bookings?.bookings.length || 0})
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`ml-2 transform duration-500 ${
                      expandedVenue ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                <div className="flex w-full gap-3 flex-wrap justify-start lg:justify-end">
                  <ButtonDropdown
                    label="Edit Venue"
                    className="w-full xs:w-auto"
                    options={[
                      {
                        label: "Edit Venue",
                        action: handleEditVenue,
                        icon: faEdit
                      },
                      {
                        label: "Delete Venue",
                        action: handleDeleteVenue,
                        icon: faTrash,
                        danger: true
                      }
                    ]}
                  />

                  <Link to={`/venue/${venue.id}`} className="w-full xs:w-auto">
                    <Button buttonType="violet" className="w-full xs:w-auto">
                      View Venue
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Expandable Bookings List */}
          {expandedVenue === venue.id && (
            <div className="mt-4 p-4 h-fit border-t border-color4-600 dark:border-color4-800">
              {bookings && bookings.bookings.length > 0 ? (
                bookings?.bookings.map((booking) => (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      key={booking.id}
                      className="bg-white dark:bg-color4-900 border border-color4-500 dark:border-color4-900 p-3 rounded-md mb-2"
                    >
                      <div className="flex flex-row justify-between content-center items-center flex-wrap gap-5 w-full truncate">
                        <Link to={`/profile/${booking.customer?.name}`}>
                          <div className="flex flex-grow w-[16rem] items-center whitespace-nowrap gap-3 m-2">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <img
                                src={booking.customer?.avatar.url}
                                alt={booking.customer?.avatar.alt}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col justify-center w-full">
                              <P>{booking.customer?.name}</P>
                              <P className="text-xs md:text-sm text-whiteFont-800 dark:text-whiteFont-700 w-full truncate">
                                {booking.customer?.email}
                              </P>
                            </div>
                          </div>
                        </Link>
                        {/* Dates */}
                        <div className="flex flex-1 flex-row md:flex-col gap-3 max-w-[8rem] justify-center content-center md:px-4">
                          <div className="flex flex-row items-center">
                            {/* DateFrom */}
                            <div className="flex flex-col items-center justify-center text-center w-full">
                              <P className="text-xl font-medium mb-[-0.5rem] w-full">
                                <FormatDate
                                  dateString={booking.dateFrom}
                                  position="center"
                                  formatString="MMM"
                                />
                              </P>
                              <P className="text-4xl font-extrabold w-full">
                                <FormatDate
                                  dateString={booking.dateFrom}
                                  position="center"
                                  formatString="d"
                                />
                              </P>
                              <P className="mt-[-0.4rem] w-full">
                                <FormatDate
                                  dateString={booking.dateFrom}
                                  position="center"
                                  formatString="yyyy"
                                />
                              </P>
                            </div>
                            <div className="flex justify-center content-center items-center m-2">
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className="w-4 h-4 text-2xl rotate-0"
                              />
                            </div>
                            {/* DateTo */}
                            <div className="flex flex-col items-center justify-center text-center w-full">
                              <P className="text-xl font-medium mb-[-0.5rem] w-full">
                                <FormatDate
                                  dateString={booking.dateTo}
                                  position="center"
                                  formatString="MMM"
                                />
                              </P>
                              <P className="text-4xl font-extrabold w-full">
                                <FormatDate
                                  dateString={booking.dateTo}
                                  position="center"
                                  formatString="d"
                                />
                              </P>
                              <P className="mt-[-0.4rem] w-full">
                                <FormatDate
                                  dateString={booking.dateTo}
                                  position="center"
                                  formatString="yyyy"
                                />
                              </P>
                            </div>
                          </div>
                        </div>
                        <P className="text-sm flex flex-1 justify-end">
                          <strong>Guests:</strong> {booking.guests}
                        </P>
                        <div className="flex flex-1 justify-end flex-row items-center gap-3 p-1 text-gray-600 dark:text-whiteFont-800 ">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="w-3 h-3 text-2xl"
                          />
                          <Link
                            to={"#"}
                            className="text-xs hover:underline text-gray-600 dark:text-whiteFont-600"
                          >
                            More info
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <P className="text-gray-500">No bookings yet.</P>
              )}
            </div>
          )}
          {isEditing && (
            <EditVenue
              venue={venue}
              onClose={() => setIsEditing(false)}
              onUpdate={refetchVenue}
            />
          )}
        </>
      )}
    </>
  );
};

export default VenueCard;
