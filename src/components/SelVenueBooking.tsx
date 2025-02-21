import { useCallback, useEffect, useState } from "react";
import {
  addDays,
  differenceInCalendarDays,
  isWithinInterval,
  setHours,
  setMinutes
} from "date-fns";
import DateRangePicker from "./DateRangePicker";
import GuestsSelector from "./GuestsSelector";
import BookVenue from "./Booking/BookVenue";
import { BookingData, Venue } from "./library/types";
import { RangeKeyDict } from "react-date-range";
import BookingSummary from "./Booking/BookingSummary";
import BookingConfirmation from "./Booking/BookingConfirmation";
import H2 from "./shared/Typography/H2";
import P from "./shared/Typography/P";
import Button from "./shared/Button/Button";
import LoaderSmall from "./ui/LoaderSmall";
import { useUserContext } from "./context/useUserContext";
import { Link } from "react-router-dom";

interface SelVenueBookingProps {
  venue: Venue;
  refetchVenue: () => void;
}

/**
 * SelVenueBooking Component
 *
 * This component allows users to book a venue by selecting available dates and specifying the number of guests.
 * It automatically finds the next available dates, disables booked dates, and ensures the correct booking process.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Venue} props.venue - The venue details, including bookings and pricing.
 * @param {Function} props.refetchVenue - Function to refresh the venue data after a successful booking.
 *
 * @returns {JSX.Element} The booking component UI.
 */

const SelVenueBooking: React.FC<SelVenueBookingProps> = ({
  venue,
  refetchVenue
}) => {
  const { isAuthenticated } = useUserContext();
  const bookedDates = useCallback(() => {
    return venue.bookings.map((booking) => ({
      start: new Date(booking.dateFrom),
      end: new Date(booking.dateTo)
    }));
  }, [venue.bookings]);

  const isDateDisabled = useCallback(
    (date: Date) => {
      const utcDate = new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          0,
          0,
          0,
          0
        )
      );

      const booked = bookedDates();

      // Check if the date itself is booked
      const isBooked = booked.some(({ start, end }) =>
        isWithinInterval(utcDate, { start, end })
      );

      // Check if the previous day is booked
      const prevDay = addDays(utcDate, -1);
      const isPrevBooked = booked.some(({ start, end }) =>
        isWithinInterval(prevDay, { start, end })
      );

      // Check if the next day is booked
      const nextDay = addDays(utcDate, 1);
      const isNextBooked = booked.some(({ start, end }) =>
        isWithinInterval(nextDay, { start, end })
      );

      // Disable if the day is booked OR if it's isolated between two booked dates
      return isBooked || (isPrevBooked && isNextBooked);
    },
    [bookedDates]
  );

  const findNextAvailableDates = useCallback(() => {
    let searchDate = new Date();
    let maxSearchDays = 365;

    while (maxSearchDays > 0) {
      if (!isDateDisabled(searchDate)) {
        const nextDay = addDays(searchDate, 1);

        if (!isDateDisabled(nextDay)) {
          return {
            startDate: setMinutes(setHours(searchDate, 15), 0), // Check-in at 3 PM
            endDate: setMinutes(setHours(nextDay, 11), 0) // Check-out at 11 AM
          };
        }
      }

      searchDate = addDays(searchDate, 1);
      maxSearchDays--;
    }

    return null;
  }, [isDateDisabled]);

  const [dateRange, setDateRange] = useState(() => {
    const initialDates = findNextAvailableDates();
    return initialDates
      ? [
          {
            startDate: initialDates.startDate,
            endDate: initialDates.endDate,
            key: "selection"
          }
        ]
      : [];
  });

  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(venue.price);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingData | null>(
    null
  );

  useEffect(() => {
    const updatedDates = findNextAvailableDates();
    setDateRange(
      updatedDates
        ? [
            {
              startDate: updatedDates.startDate,
              endDate: updatedDates.endDate,
              key: "selection"
            }
          ]
        : []
    );
  }, [venue.bookings, findNextAvailableDates]);

  useEffect(() => {
    if (dateRange.length === 0 || !venue.price) return;

    const totalNights = Math.max(
      differenceInCalendarDays(dateRange[0].endDate, dateRange[0].startDate),
      1
    );

    setTotalPrice(totalNights * venue.price * guests);
  }, [dateRange, guests, venue.price]);

  /* Handle date selection */
  const handleDateChange = (rangesByKey: RangeKeyDict) => {
    const { selection } = rangesByKey;
    let checkInDate = selection.startDate || new Date();
    let checkOutDate = selection.endDate || addDays(checkInDate, 1);

    // Normalize to start of the day in UTC
    checkInDate = new Date(
      Date.UTC(
        checkInDate.getFullYear(),
        checkInDate.getMonth(),
        checkInDate.getDate(),
        15,
        0,
        0,
        0 // Check-in time 15:00 UTC
      )
    );

    checkOutDate = new Date(
      Date.UTC(
        checkOutDate.getFullYear(),
        checkOutDate.getMonth(),
        checkOutDate.getDate(),
        11,
        0,
        0,
        0 // Check-out time 11:00 UTC
      )
    );

    while (isDateDisabled(checkInDate) || isDateDisabled(checkOutDate)) {
      checkInDate = addDays(checkInDate, 1);
      checkOutDate = addDays(checkInDate, 1);
    }

    setDateRange([
      {
        startDate: checkInDate,
        endDate: checkOutDate,
        key: "selection"
      }
    ]);
  };

  /* Handle guest selection */
  const handleGuestChange = (newGuestCount: number) => {
    setGuests(newGuestCount);
  };

  const openBookNowSummery = () => {
    setIsSummaryOpen(!isSummaryOpen);
  };

  const handleBooking = () => {
    setErrorMessage(null);
    setIsBooking(true);

    if (guests < 1) {
      setErrorMessage("Please select at least 1 guest.");
      setIsBooking(false);
      return;
    }

    const checkIn = new Date(
      Date.UTC(
        dateRange[0].startDate.getFullYear(),
        dateRange[0].startDate.getMonth(),
        dateRange[0].startDate.getDate(),
        15,
        0,
        0,
        0 // 15:00 UTC
      )
    );

    const checkOut = new Date(
      Date.UTC(
        dateRange[0].endDate.getFullYear(),
        dateRange[0].endDate.getMonth(),
        dateRange[0].endDate.getDate(),
        11,
        0,
        0,
        0 // 11:00 UTC
      )
    );

    const newBooking = {
      venueName: venue.name,
      dateFrom: checkIn.toISOString(),
      dateTo: checkOut.toISOString(),
      guests,
      venueId: venue.id
    };

    setBookingData(newBooking);
  };

  const handleSuccess = () => {
    setConfirmedBooking(bookingData);
    setIsBooking(false);
    setIsSummaryOpen(false);
    setIsConfirmationOpen(true);
    setBookingData(null);
  };

  const handleError = (error: string) => {
    setErrorMessage(error);
    setIsBooking(false);
  };

  return (
    <div className="w-full flex justify-center md:col-span-2 lg:col-span-1 mx-0 px-0">
      <div className="w-full xs:w-fit mx-4 h-fit my-2 bg-white dark:bg-customBgDark-500 p-2 md:p-6 rounded-lg shadow-md border border-gray-200 dark:border-customBgDark-600">
        <div className="flex content-center w-full flex-col my-4 max-w-sm gap-4 justify-center items-start">
          <H2 className="text-2xl font-semibold">{venue?.price} kr / night</H2>
          <div className="w-full">
            <DateRangePicker
              dateRange={dateRange}
              onDateChange={handleDateChange}
              isCalendarOpen={isCalendarOpen}
              toggleCalendar={() => setIsCalendarOpen(!isCalendarOpen)}
              isDateDisabled={isDateDisabled}
            />
            <GuestsSelector
              guests={guests}
              maxGuests={venue.maxGuests}
              onChange={handleGuestChange}
            />
          </div>
          {isAuthenticated ? (
            <Button
              buttonType={isSummaryOpen ? "violetSecondary" : "violet"}
              className="w-full"
              onClick={openBookNowSummery}
            >
              Book now
            </Button>
          ) : (
            <>
              <P className="text-sm text-gray-500">
                Log in to book this venue.
              </P>
              <Link to="/auth" className="w-full">
                <Button buttonType="violet" className="w-full">
                  Log in
                </Button>
              </Link>
            </>
          )}
          {isSummaryOpen && (
            <>
              <BookingSummary
                price={venue.price}
                dateFrom={dateRange[0].startDate}
                dateTo={dateRange[0].endDate}
                guests={guests}
              />
              <Button
                buttonType="violet"
                onClick={handleBooking}
                disabled={isBooking}
                className="w-full"
              >
                {isBooking ? (
                  <LoaderSmall className="w-full mx-auto" />
                ) : (
                  "Confirm Booking"
                )}
              </Button>
              {errorMessage && (
                <P className="mt-2 text-red-500 text-sm">{errorMessage}</P>
              )}
            </>
          )}
        </div>

        {confirmedBooking && (
          <BookingConfirmation
            booking={confirmedBooking}
            total={totalPrice}
            isConfirmationOpen={isConfirmationOpen}
            onClose={() => {
              setConfirmedBooking(null);
              setIsConfirmationOpen(false);
              refetchVenue();
            }}
          />
        )}

        {bookingData && (
          <BookVenue
            bookingData={bookingData}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
      </div>
    </div>
  );
};

export default SelVenueBooking;
