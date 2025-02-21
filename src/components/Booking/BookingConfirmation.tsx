import { useEffect } from "react";
import { format } from "date-fns";
import Button from "../shared/Button/Button";
import H2 from "../shared/Typography/H2";
import P from "../shared/Typography/P";
import { Link } from "react-router-dom";
import DatePickerModal from "./DatePickerModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../context/useUserContext";
import "./BookingConfirmation.css";

interface BookingConfirmationProps {
  booking: {
    dateFrom: string;
    dateTo: string;
    guests: number;
    venueName: string;
    venueId: string;
  };
  total: number;
  onClose: () => void;
  isConfirmationOpen: boolean;
}

/**
 * BookingConfirmation Component
 *
 * This component displays a confirmation modal when a booking is successfully made.
 * It includes the booking details, total price, and options to view bookings or make another booking.
 *
 * @component
 * @example
 * // Usage:
 * <BookingConfirmation />
 *
 * @returns {JSX.Element} The rendered booking confirmation component.
 */

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  total,
  onClose,
  isConfirmationOpen
}) => {
  const { user } = useUserContext();

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isConfirmationOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isConfirmationOpen]);

  return (
    <>
      {isConfirmationOpen && (
        <DatePickerModal
          isOpen={isConfirmationOpen}
          onClose={onClose}
          className="bg-white dark:bg-customBgDark-500 rounded-lg shadow-lg"
        >
          <div className="w-full p-6 overflow-y-auto max-h-[90vh] customBox-scrollbar">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-color1-100 dark:bg-color1-600 p-4 m-2 rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="w-8 h-8 text-color1-500 dark:text-color1-200"
                />
              </div>
              <H2 className="md:text-4xl font-heading font-semibold text-color1-600 dark:text-color1-200">
                Booking Confirmed!
              </H2>
              <P className="mt-2 max-w-md text-center">
                Dear {user.name}, your booking at{" "}
                <strong>{booking.venueName}</strong> has been successfully
                confirmed.
              </P>
              <P className="mt-5 text-left">
                Thank you for choosing our service!
              </P>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md p-6 mt-4 bg-gray-200 dark:bg-customBgDark-600 border border-gray-300 dark:border-customBgDark-500 rounded-lg text-gray-600 dark:text-gray-300">
                <div className="flex flex-col">
                  <P className="font-semibold">Check-in:</P>
                  <P>
                    {format(new Date(booking.dateFrom), "dd.MM.yyyy HH:mm")}
                  </P>
                </div>

                <div className="flex flex-col">
                  <P className="font-semibold">Check-out:</P>
                  <P>{format(new Date(booking.dateTo), "dd.MM.yyyy HH:mm")}</P>
                </div>

                <div className="flex flex-col">
                  <P className="font-semibold">Guests:</P>
                  <P>{booking.guests}</P>
                </div>

                <div className="flex flex-col">
                  <P className="font-semibold">Total:</P>
                  <P className="font-bold">{total} kr</P>
                </div>
              </div>
              <P className="mt-1 text-center text-gray-600 text-[12px]">
                Booking ID: <strong>{booking.venueId}</strong>
              </P>

              <div className="mt-6 flex flex-col sm:flex-row w-full max-w-xs sm:max-w-md justify-between sm:justify-center gap-2">
                <Link to="/profile/bookings">
                  <Button buttonType="violetSecondary" className="w-full">
                    View My Bookings
                  </Button>
                </Link>
                <Button buttonType="violet" onClick={onClose}>
                  Make Another Booking
                </Button>
              </div>
            </div>
          </div>
        </DatePickerModal>
      )}
    </>
  );
};

export default BookingConfirmation;
