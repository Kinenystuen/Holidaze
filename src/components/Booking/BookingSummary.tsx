import { useEffect, useState } from "react";
import H3 from "../shared/Typography/H3";
import P from "../shared/Typography/P";

interface BookingSummaryProps {
  price: number;
  dateFrom: Date;
  dateTo: Date;
  guests: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  price,
  dateFrom,
  dateTo,
  guests
}) => {
  const [nights, setNights] = useState<number>(0);
  const calculateNights = (dateFrom: Date, dateTo: Date): number => {
    if (!(dateFrom instanceof Date) || !(dateTo instanceof Date)) {
      throw new Error("Invalid date format");
    }
    const startDate = new Date(dateFrom.setHours(0, 0, 0, 0));
    const endDate = new Date(dateTo.setHours(0, 0, 0, 0));

    if (endDate <= startDate) return 0;
    return Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  };
  useEffect(
    () => setNights(calculateNights(dateFrom, dateTo)),
    [dateFrom, dateTo]
  );

  return (
    <div className="flex-1 p-4 w-full ">
      <H3 className="text-lg font-semibold">Booking Summary</H3>
      <P className="flex justify-between">
        <span>Guests:</span> {guests}
      </P>
      <P className="flex justify-between">
        <span>Nights:</span> {calculateNights(dateFrom, dateTo)}
      </P>
      <H3 className="flex text-md justify-between mt-3">Total Price</H3>
      <P className="flex justify-between">
        <span>
          {price * guests} kr x {nights} {nights > 1 ? "nights" : "night"}:
        </span>
        {price * nights} kr
      </P>
    </div>
  );
};

export default BookingSummary;
