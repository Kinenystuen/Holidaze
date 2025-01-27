import { format } from "date-fns";
import Button from "../shared/Button/Button";
import H2 from "../shared/Typography/H2";
import P from "../shared/Typography/P";
import { Link } from "react-router-dom";
import DatePickerModal from "./DatePickerModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../context/useUserContext";

interface BookingConfirmationProps {
  booking: {
    dateFrom: string;
    dateTo: string;
    guests: number;
    venueName: string;
    venueId: string;
    price: number;
  };
  onClose: () => void;
  isConfirmationOpen: boolean;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  onClose,
  isConfirmationOpen
}) => {
  const { user } = useUserContext();
  console.log(booking);
  return (
    <>
      {isConfirmationOpen && (
        <DatePickerModal isOpen={isConfirmationOpen} onClose={onClose}>
          <div className="p-6 flex flex-col items-center">
            <div className="bg-color1-100 dark:bg-color1-900 w-18 h-18 p-4 m-2 rounded-full">
              <FontAwesomeIcon
                icon={faCheck}
                className="w-10 h-9 text-color1-500 dark:text-color1-200"
              />
            </div>
            <H2 className="md:text-4xl font-heading font-semibold text-color1-600 dark:text-color1-200">
              Booking Confirmed!
            </H2>
            <P className="mt-2 max-w-md text-center">
              Dear {user.name}. We are pleased to inform you that your booking
              at <strong>{booking.venueName}</strong> has been received
              successfully and confirmed.
            </P>
            <P className="mt-5 text-left">
              Thank you for choosing our service!
            </P>

            <div className="flex flex-row items-center mt-4 p-6 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-customBgDark-600 border border-gray-200 dark:border-customBgDark-600 rounded-lg">
              <div className="mr-4 border-r border-gray-300 dark:border-customBgDark-500 pr-4 ">
                <P className="">
                  <strong>Check-in:</strong>
                </P>
                <P className="">
                  {format(new Date(booking.dateFrom), "dd.MM.yyyy.HH:mm")}
                </P>
              </div>
              <div className="mr-4 border-r border-gray-300 dark:border-customBgDark-500 pr-4">
                <P>
                  <strong>Check-out:</strong>
                </P>
                <P>{format(new Date(booking.dateTo), "dd.MM.yyyy.HH:mm")}</P>
              </div>
              <div className="mr-4 border-r border-gray-300 dark:border-customBgDark-500 pr-4">
                <P>
                  <strong>Guests:</strong>
                </P>
                <P>{booking.guests}</P>
              </div>
              <div className="border-gray-300 dark:border-customBgDark-500 pr-4">
                <P>
                  <strong>Total:</strong>
                </P>
                <P>{booking.price} kr</P>
              </div>
            </div>
            <P className="mt-1 text-center text-gray-600 text-[12px]">
              Booking ID: <strong>{booking.venueId}</strong>
            </P>

            <div className="mt-6 flex justify-between gap-2">
              <Link to="/profile/bookings">
                <Button buttonType="violetSecondary" className="">
                  View My Bookings
                </Button>
              </Link>
              <Button buttonType="violet" onClick={onClose}>
                Make Another Booking
              </Button>
            </div>
          </div>
        </DatePickerModal>
      )}
    </>
  );
};

export default BookingConfirmation;
