import { useApi } from "./UseApi";
import { apiHostUrl } from "../library/constants";

/**
 * A reusable hook for deleting a venue.
 * - Sends a DELETE request to the API.
 * - Handles loading, success, and error states.
 *
 * @param {string} venueId - The ID of the venue to delete.
 * @returns {Object} Methods and state for deleting a venue.
 */
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
