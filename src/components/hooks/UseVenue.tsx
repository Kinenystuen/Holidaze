import { createContext, useContext } from "react";
import { VenueData } from "../context/VenueContext";

interface VenueContextType {
  venue: VenueData;
  setVenue: React.Dispatch<React.SetStateAction<VenueData>>;
  updateVenue: (newData: Partial<VenueData>) => void;
  resetVenue: () => void;
}

export const VenueContext = createContext<VenueContextType | undefined>(
  undefined
);

export const useVenue = () => {
  const context = useContext(VenueContext);
  if (!context) {
    throw new Error("useVenue must be used within a VenueProvider");
  }
  return context;
};
