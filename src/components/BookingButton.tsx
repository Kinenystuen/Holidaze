interface BookingButtonProps {
  onClick: () => void;
  isBooking: boolean;
  isDisabled: boolean;
}

const BookingButton: React.FC<BookingButtonProps> = ({
  onClick,
  isBooking,
  isDisabled
}) => {
  return (
    <button
      onClick={onClick}
      className={`mt-4 px-4 py-2 rounded-md w-full transition ${
        !isDisabled
          ? "bg-violet-600 text-white hover:bg-violet-700"
          : "bg-gray-400 text-gray-700 cursor-not-allowed"
      }`}
      disabled={isDisabled}
    >
      {isBooking ? "Booking..." : "Confirm Booking"}
    </button>
  );
};

export default BookingButton;
