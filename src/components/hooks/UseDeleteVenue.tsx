import { useApi } from "./UseApi";
import { apiHostUrl } from "../library/constants";

export const useDeleteVenue = (venueId: string) => {
  const { isLoading, isError, errorMessage, fetchData } = useApi(
    `${apiHostUrl}/holidaze/venues/${venueId}`,
    { method: "DELETE" },
    true
  );

  const deleteVenue = async () => {
    if (!venueId) return;

    try {
      // console.log(`Deleting venue with ID: ${venueId}`);
      await fetchData();
      alert("Venue successfully deleted!");
    } catch (error) {
      console.error("Error deleting venue:", error);
      alert("Failed to delete venue.");
    }
  };

  return { deleteVenue, isLoading, isError, errorMessage };
};
