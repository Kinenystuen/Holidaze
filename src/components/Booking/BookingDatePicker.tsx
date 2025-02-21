import { useEffect, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { apiHostUrl } from "../library/constants";
import { useApi } from "../hooks/UseApi";
import { Venue } from "../library/types";

interface BookingDatePickerProps {
  venueId: string;
  bookingId: string;
  selectedRange: { startDate: Date; endDate: Date; key: string }[];
  onDateChange: (rangesByKey: RangeKeyDict) => void;
}

/**
 * BookingDatePicker Component
 * - Displays a date picker for booking a venue.
 * - Fetches venue bookings to disable unavailable dates.
 * - Uses react-date-range for date selection.
 * - @param {string} venueId - The ID of the venue to book.
 * - @param {string} bookingId - The ID of the booking being edited.
 * - @param {RangeKeyDict} selectedRange - The selected date range.
 * - @param {(rangesByKey: RangeKeyDict) => void} onDateChange - Callback for date changes.
 * @component
 * @returns {JSX.Element} The BookingDatePicker component.
 *
 */

const BookingDatePicker: React.FC<BookingDatePickerProps> = ({
  venueId,
  bookingId,
  selectedRange,
  onDateChange
}) => {
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  // Fetch venue bookings
  const { response } = useApi<Venue>(
    `${apiHostUrl}/holidaze/venues/${venueId}?_bookings=true`
  );

  // Update state when response is available
  useEffect(() => {
    if (response?.data) {
      const bookedDates: Date[] = [];

      response.data.bookings.forEach(
        (booking: { id: string; dateFrom: string; dateTo: string }) => {
          if (booking.id === bookingId) return;

          const currentDate = new Date(booking.dateFrom);
          const endDate = new Date(booking.dateTo);

          while (currentDate <= endDate) {
            bookedDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      );

      setDisabledDates(bookedDates);
    }
  }, [response, bookingId]);

  return (
    <DateRange
      ranges={selectedRange}
      onChange={onDateChange}
      moveRangeOnFirstSelection={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default BookingDatePicker;
