import { useState } from "react";
import { useApi } from "./UseApi";
import { apiHostUrl } from "../library/constants";
import { VenueData } from "../context/VenueContext";

const useCreateVenue = () => {
  const [loading, setLoading] = useState(false);
  const { fetchData, errorMessage } = useApi(
    `${apiHostUrl}/holidaze/venues`,
    { method: "POST" },
    true
  );

  const createVenue = async (venueData: VenueData) => {
    setLoading(true);

    try {
      const result = await fetchData({
        body: JSON.parse(JSON.stringify(venueData))
      });
      console.log(result);

      if (result) {
        alert("Venue created successfully!"); // !!! Change success handling
      } else {
        alert(errorMessage || "An error occurred.");
      }
    } catch (error) {
      alert("Error submitting the venue. Please try again.");
      console.error("Error creating venue:", error);
    } finally {
      setLoading(false);
    }
  };

  return { createVenue, loading };
};

export default useCreateVenue;
