import { useApi } from "./UseApi";
import { apiHostUrl } from "../library/constants";

export const useDeleteBooking = (bookingId: string) => {
  const { isLoading, isError, errorMessage, fetchData } = useApi(
    `${apiHostUrl}/holidaze/bookings/${bookingId}`,
    { method: "DELETE" },
    true
  );

  const deleteBooking = async () => {
    if (!bookingId) return;

    try {
      console.log(`Deleting booking with ID: ${bookingId}`);
      await fetchData();
      alert("Booking successfully deleted!");
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking.");
    }
  };

  return { deleteBooking, isLoading, isError, errorMessage };
};
