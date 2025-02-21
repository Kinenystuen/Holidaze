import { useState } from "react";
import { useApi } from "./UseApi";
import { apiHostUrl } from "../library/constants";
import { VenueData } from "../context/VenueContext";

/**
 * A reusable hook for creating a new venue.
 * - Sends a POST request to the API.
 * - Handles loading, success, and error states.
 *
 * @returns {Object} Methods and state for creating a venue.
 */

const useCreateVenue = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [venueId, setVenueId] = useState<string | null>(null);

  const { fetchData } = useApi(
    `${apiHostUrl}/holidaze/venues`,
    { method: "POST" },
    true
  );

  const createVenue = async (venueData: VenueData, resetForm: () => void) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await fetchData({
        body: JSON.parse(JSON.stringify(venueData))
      });

      if (result) {
        setSuccessMessage("Venue created successfully!");
        setVenueId(result.data.id);

        // Clear form after success
        resetForm();
      } else {
        setErrorMessage("An error occurred while creating the venue.");
      }
    } catch (error) {
      setErrorMessage("Error submitting the venue. Please try again.");
      console.error("Error creating venue:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    createVenue,
    loading,
    successMessage,
    setSuccessMessage,
    errorMessage,
    venueId
  };
};

export default useCreateVenue;
