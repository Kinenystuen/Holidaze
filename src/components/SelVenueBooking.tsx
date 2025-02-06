import { useCallback, useEffect, useState } from "react";
import {
  addDays,
  differenceInDays,
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

const SelVenueBooking: React.FC<SelVenueBookingProps> = ({
  venue,
  refetchVenue
}) => {
  const { isAuthenticated } = useUserContext();
  const bookedDates = useCallback(
    () =>
      venue.bookings.map((booking) => ({
        start: new Date(booking.dateFrom),
        end: new Date(booking.dateTo)
      })),
    [venue.bookings]
  );

  /* Function to check if a date is disabled */
  const isDateDisabled = useCallback(
    (date: Date) => {
      return bookedDates().some(({ start, end }) => {
        const nextDay = addDays(date, 1);
        return (
          isWithinInterval(date, {
            start,
            end: setMinutes(setHours(end, 10), 59)
          }) ||
          isWithinInterval(nextDay, {
            start,
            end: setMinutes(setHours(end, 9), 59)
          })
        );
      });
    },
    [bookedDates]
  );

  const findNextAvailableDates = useCallback(() => {
    let startDate = new Date();
    let endDate = addDays(startDate, 1);

    while (isDateDisabled(startDate) || isDateDisabled(endDate)) {
      startDate = addDays(startDate, 1);
      endDate = addDays(startDate, 1);
    }

    return {
      startDate: setMinutes(setHours(startDate, 15), 0), // Check-in at 3 PM
      endDate: setMinutes(setHours(endDate, 11), 0) // Check-out at 11 AM
    };
  }, [isDateDisabled]);

  const [dateRange, setDateRange] = useState(() => {
    const initialDates = findNextAvailableDates();
    return [
      {
        startDate: initialDates.startDate,
        endDate: initialDates.endDate,
        key: "selection"
      }
    ];
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

  /* Update dateRange only when `venue.bookings` change */
  useEffect(() => {
    const updatedDates = findNextAvailableDates();
    setDateRange([
      {
        startDate: updatedDates.startDate,
        endDate: updatedDates.endDate,
        key: "selection"
      }
    ]);
  }, [venue.bookings, findNextAvailableDates]);

  /* Update total price when guests or dateRange changes */
  useEffect(() => {
    const totalNights = Math.max(
      differenceInDays(dateRange[0].endDate, dateRange[0].startDate),
      1
    );
    setTotalPrice(totalNights * venue.price * guests);
  }, [dateRange, guests, venue.price]);

  /* Handle date selection */
  const handleDateChange = (rangesByKey: RangeKeyDict) => {
    const { selection } = rangesByKey;
    let checkInDate = selection.startDate || new Date();
    let checkOutDate = selection.endDate || addDays(checkInDate, 1);

    while (isDateDisabled(checkInDate) || isDateDisabled(checkOutDate)) {
      checkInDate = addDays(checkInDate, 1);
      checkOutDate = addDays(checkInDate, 1);
    }

    setDateRange([
      {
        startDate: setMinutes(setHours(checkInDate, 15), 0),
        endDate: setMinutes(setHours(checkOutDate, 11), 0),
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

  /* Handle booking confirmation */
  const handleBooking = () => {
    setErrorMessage(null);

    if (guests < 1) {
      setErrorMessage("Please select at least 1 guest.");
      return;
    }

    setBookingData({
      venueName: venue.name,
      dateFrom: dateRange[0].startDate.toISOString(),
      dateTo: dateRange[0].endDate.toISOString(),
      guests,
      venueId: venue.id,
      price: totalPrice
    });

    setIsBooking(true);
  };

  const handleSuccess = () => {
    setConfirmedBooking(bookingData);
    setIsBooking(false);
    setIsSummaryOpen(false);
  };

  const handleError = (error: string) => {
    setErrorMessage(error);
    setIsBooking(false);
  };

  return (
    <div className="w-full flex justify-center md:col-span-2 lg:col-span-1 mx-0 px-0">
      <div className="w-full xs:w-fit mx-4 h-fit my-10 bg-white dark:bg-customBgDark-500 p-2 md:p-6 rounded-lg shadow-md border border-gray-200 dark:border-customBgDark-600">
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
                {isBooking ? <LoaderSmall /> : "Confirm Booking"}
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
