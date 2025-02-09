import { Link } from "react-router-dom";
import H3 from "../shared/Typography/H3";
import P from "../shared/Typography/P";
import { FormatDate } from "../ui/FormatDate";
import Button from "../shared/Button/Button";
import { Booking } from "../library/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClock,
  faEdit,
  faInfoCircle,
  faMapMarkerAlt,
  faMoneyBill1Wave,
  faTrash,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import ButtonDropdown from "../ButtonDropdown";
import { useDeleteBooking } from "../hooks/UseDeleteBooking";
import LoaderSmall from "../ui/LoaderSmall";
import { useEffect, useState } from "react";
import EditBooking from "./EditBooking";

const BookingCard = ({
  booking,
  refetchBookings
}: {
  booking: Booking;
  refetchBookings: () => void;
}) => {
  const { deleteBooking, isLoading } = useDeleteBooking(booking.id);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (booking.dateFrom && booking.dateTo && booking.venue?.price) {
      const calculatedNights = Math.max(
        Math.floor(
          (new Date(booking.dateTo).getTime() -
            new Date(booking.dateFrom).getTime()) /
            (1000 * 60 * 60 * 24)
        ),
        1
      );

      setTotalPrice(booking.venue.price * calculatedNights * booking.guests);
    }
  }, [booking.dateFrom, booking.dateTo, booking.guests, booking.venue?.price]);

  const handleEditBooking = () => {
    setIsEditing(true);
  };

  const handleCancelBooking = async () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      await deleteBooking();
      refetchBookings();
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full md:max-h-[22rem] bg-white col-span-1 md:col-span-1 dark:bg-customBgDark-500 rounded-xl shadow-sm border border-gray-200 dark:border-customBgDark-600">
      {/* Show Loader if deleting */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-40">
          <LoaderSmall />
        </div>
      ) : (
        <>
          {/* Image */}
          <div className="w-full min-h-52 md:w-[30vw] max-h-72 rounded-t-lg md:rounded-none md:rounded-s-lg overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={booking.venue?.media[0].url}
              alt={booking.venue?.media[0].alt}
            />
          </div>

          <div className="flex flex-col my-2 items-center md:flex-row">
            {/* Dates */}
            <div className="flex flex-row md:flex-col gap-3 justify-center content-center md:px-4">
              {/* DateFrom */}
              <div className="flex xs:gap-1 md:gap-0 flex-col xs:flex-row md:flex-col items-center justify-center text-center w-full">
                <P className="text-xl font-medium mb-[-0.5rem] xs:m-0 md:mb-[-0.5rem] w-full">
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
                <P className="mt-[-0.4rem] xs:m-0 md:mt-[-0.4rem] w-full">
                  <FormatDate
                    dateString={booking.dateFrom}
                    position="center"
                    formatString="yyyy"
                  />
                </P>
              </div>
              <div className="flex justify-center content-center items-center">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="w-4 h-4 text-2xl rotate-0 md:rotate-90"
                />
              </div>
              {/* DateTo */}
              <div className="flex xs:gap-1 md:gap-0 flex-col xs:flex-row md:flex-col items-center justify-center text-center w-full">
                <P className="text-xl font-medium mb-[-0.5rem] xs:m-0 md:mb-[-0.5rem] w-full">
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
                <P className="mt-[-0.4rem] xs:m-0 md:mt-[-0.4rem]  w-full">
                  <FormatDate
                    dateString={booking.dateTo}
                    position="center"
                    formatString="yyyy"
                  />
                </P>
              </div>
            </div>
            <span className="md:border-r dark:border-customBgDark-400 md:my-3"></span>

            {/* Booking Info */}
            <div className="flex flex-col w-full h-fit">
              <div className="px-4 py-2 w-full flex flex-col gap-1 flex-grow">
                <H3 className="text-xl font-bold">{booking.venue?.name}</H3>
                {/* Location */}
                <div className="flex items-center text-sm text-gray-600 ">
                  {booking.venue?.location && (
                    <div className="flex items-center ">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="mr-2 text-gray-500 dark:text-whiteFont-800 w-3 h-3 px-1"
                      />
                      <P className="text-gray-500 text-xs">
                        {[
                          booking.venue?.location.address,
                          booking.venue?.location.zip,
                          booking.venue?.location.city,
                          booking.venue?.location.country
                        ]
                          .filter(Boolean)
                          .join(", ") || "Location not available"}
                      </P>
                    </div>
                  )}
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-1 gap-2 w-full">
                  <div className="flex flex-row items-center gap-2">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="w-4 h-4 text-2xl p-1"
                    />
                    <div>
                      <P className="text-sm text-gray-600 dark:text-gray-300">
                        Check-in:{" "}
                        <FormatDate
                          dateString={booking.dateFrom}
                          formatString="HH:mm"
                        />
                      </P>
                      <P className="text-sm text-gray-600 dark:text-gray-300">
                        Check-out:{" "}
                        <FormatDate
                          dateString={booking.dateTo}
                          formatString="HH:mm"
                        />
                      </P>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="w-4 h-4 text-2xl p-1"
                    />
                    <P className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      Guests: {booking.guests}
                    </P>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faMoneyBill1Wave}
                      className="w-4 h-4 text-2xl p-1"
                    />
                    <P className="text-sm text-gray-600 dark:text-gray-300">
                      Total price: {totalPrice} kr
                    </P>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-3 p-1 text-gray-600 dark:text-whiteFont-800 ">
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

              {/* Actions */}

              <div className="flex gap-2 w-full text-sm flex-wrap py-2 mx-4 mb-2">
                {booking.dateTo > new Date().toISOString() && (
                  <ButtonDropdown
                    label="Edit Booking"
                    options={[
                      {
                        label: "Edit Booking",
                        action: handleEditBooking,
                        icon: faEdit
                      },
                      {
                        label: "Cancel Booking",
                        action: handleCancelBooking,
                        icon: faTrash,
                        danger: true
                      }
                    ]}
                  />
                )}
                <Link to={`/venue/${booking.venue?.id}`}>
                  <Button buttonType="violet">View Venue</Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {isEditing && (
        <EditBooking
          booking={booking}
          maxGuests={booking.venue?.maxGuests ?? 0}
          onClose={() => setIsEditing(false)}
          onUpdate={refetchBookings}
          venueId={booking.venue?.id ?? ""}
        />
      )}
    </div>
  );
};

export default BookingCard;
