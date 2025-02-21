import { useEffect, useState } from "react";
import H3 from "../shared/Typography/H3";
import P from "../shared/Typography/P";

interface BookingSummaryProps {
  price: number;
  dateFrom: Date;
  dateTo: Date;
  guests: number;
}

/**
 * BookingSummary Component
 * - Displays a summary of the booking details.
 * - Calculates the total price based on the price, dates, and guests.
 * - @param {number} price - The price per night.
 * - @param {Date} dateFrom - The start date of the booking.
 * - @param {Date} dateTo - The end date of the booking.
 * - @param {number} guests - The number of guests.
 * @component
 * @returns {JSX.Element} The BookingSummary component.
 */

const BookingSummary: React.FC<BookingSummaryProps> = ({
  price,
  dateFrom,
  dateTo,
  guests
}) => {
  const [nights, setNights] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  /* Function to calculate nights */
  const calculateNights = (dateFrom: Date, dateTo: Date): number => {
    if (!(dateFrom instanceof Date) || !(dateTo instanceof Date)) {
      throw new Error("Invalid date format");
    }

    const startDate = new Date(dateFrom.setHours(0, 0, 0, 0));
    const endDate = new Date(dateTo.setHours(0, 0, 0, 0));

    if (endDate <= startDate) return 1;
    return Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  /* Update nights & total price when dates or guests change */
  useEffect(() => {
    const calculatedNights = calculateNights(dateFrom, dateTo);
    setNights(calculatedNights);
    setTotalPrice(price * calculatedNights * guests);
  }, [dateFrom, dateTo, guests, price]);

  return (
    <div className="flex-1 p-4 w-full">
      <H3 className="text-lg font-semibold">Booking Summary</H3>
      <P className="flex justify-between">
        <span>Guests:</span> {guests}
      </P>
      <P className="flex justify-between">
        <span>Nights:</span> {nights}
      </P>
      <H3 className="flex text-md justify-between mt-3 border-t border-color2-600 pt-2">
        Total Price
      </H3>
      <P className="flex justify-between">
        {price} kr x {guests} guests x {nights}{" "}
        {nights > 1 ? "nights" : "night"}:
      </P>
      <P className="flex text-3xl justify-end">{totalPrice} kr</P>
    </div>
  );
};

export default BookingSummary;
