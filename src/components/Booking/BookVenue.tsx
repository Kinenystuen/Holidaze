import { useEffect, useRef } from "react";
import { apiHostUrl } from "../library/constants";
import { useApi } from "../hooks/UseApi";

interface BookingData {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

const BookVenue = ({
  bookingData,
  onSuccess,
  onError
}: {
  bookingData: BookingData;
  onSuccess: () => void;
  onError: (error: string) => void;
}) => {
  const { fetchData, isError, errorMessage } = useApi(
    `${apiHostUrl}/holidaze/bookings`,
    { method: "POST" },
    true
  );

  const hasPosted = useRef(false);

  useEffect(() => {
    const postBooking = async () => {
      if (hasPosted.current) return;
      hasPosted.current = true;

      const result = await fetchData({
        body: JSON.parse(JSON.stringify(bookingData))
      });

      if (result && !isError) {
        onSuccess();
      } else {
        onError(errorMessage || "An unexpected error occurred.");
      }
    };

    if (bookingData) {
      postBooking();
    }
  }, [bookingData, fetchData, isError, errorMessage, onSuccess, onError]);

  return null;
};

export default BookVenue;
