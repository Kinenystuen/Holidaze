import { useState, ReactNode } from "react";
import { Location, Media, Meta } from "../library/types";
import { VenueContext } from "../hooks/UseVenue";

export interface VenueData {
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  meta: Meta;
  location: Location;
}

export const VenueProvider = ({ children }: { children: ReactNode }) => {
  const [venue, setVenue] = useState<VenueData>({
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 1,
    rating: 0,
    meta: { wifi: false, parking: false, breakfast: false, pets: false },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0
    }
  });

  const updateVenue = (newData: Partial<VenueData>) => {
    setVenue((prev) => ({ ...prev, ...newData }));
  };

  const resetVenue = () => {
    setVenue({
      name: "",
      description: "",
      media: [],
      price: 0,
      maxGuests: 1,
      rating: 0,
      meta: { wifi: false, parking: false, breakfast: false, pets: false },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
        lat: 0,
        lng: 0
      }
    });
  };

  return (
    <VenueContext.Provider value={{ venue, setVenue, updateVenue, resetVenue }}>
      {children}
    </VenueContext.Provider>
  );
};
