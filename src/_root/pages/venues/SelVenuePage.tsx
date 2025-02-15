import { Link, useParams } from "react-router-dom";
import { Venue, Meta } from "../../../components/library/types";
import { apiHostUrl } from "../../../components/library/constants";
import { useApi } from "../../../components/hooks/UseApi";

import Loader from "../../../components/ui/Loader";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import P from "../../../components/shared/Typography/P";
import Button from "../../../components/shared/Button/Button";
import MetaTags from "../../../components/metaTags";
import Breadcrumb from "../../../components/ui/BreadCrumbItem";
import SelVenue from "./SelVenue";
import SimilarVenues from "./SimilarVenues";
import { useEffect, useState } from "react";

const SelVenuePage = () => {
  const { id } = useParams<{ id: string }>();
  const [similarVenues, setSimilarVenues] = useState<Venue[]>([]);
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [isFetchingAll, setIsFetchingAll] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch the selected venue
  const { response, isLoading, isError, errorMessage, fetchData } =
    useApi<Venue>(
      `${apiHostUrl}/holidaze/venues/${id}?_owner=true&_bookings=true`
    );

  const venueData = response?.data;

  // Function to fetch all venues
  const fetchAllVenues = async () => {
    let allData: Venue[] = [];
    let currentPage = 1;
    let hasMore = true;

    try {
      while (hasMore) {
        const response = await fetch(
          `${apiHostUrl}/holidaze/venues?limit=100&page=${currentPage}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.errors?.[0]?.message || "Failed to fetch venues"
          );
        }

        allData = [...allData, ...data.data]; // Merge new data
        hasMore = data.meta?.nextPage ? true : false;
        currentPage++;
      }

      setAllVenues(allData);
      setIsFetchingAll(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFetchError(error.message);
      } else {
        setFetchError("An unknown error occurred");
      }
      setIsFetchingAll(false);
    }
  };

  useEffect(() => {
    fetchAllVenues();
  }, []);

  useEffect(() => {
    if (venueData && allVenues.length > 0) {
      const filteredVenues = allVenues.filter((venue) => {
        if (
          !venue.location ||
          !venue.meta ||
          !venueData.location ||
          !venueData.meta
        )
          return false;

        // Exclude the currently selected venue
        if (venue.id === venueData.id) return false;

        // Location Match (City, Country, or Continent)
        const locationMatch =
          venue.location.city?.toLowerCase() ===
            venueData.location.city?.toLowerCase() ||
          venue.location.country?.toLowerCase() ===
            venueData.location.country?.toLowerCase() ||
          venue.location.continent?.toLowerCase() ===
            venueData.location.continent?.toLowerCase();

        // Rating Match (±0.5 rating)
        const ratingMatch =
          Math.abs((venue.rating || 0) - (venueData.rating || 0)) <= 0.5;

        // Shared Amenities (At least 1 match)
        const sharedAmenities: (keyof Meta)[] = [
          "wifi",
          "parking",
          "breakfast",
          "pets"
        ];
        const hasSharedAmenities = sharedAmenities.some(
          (amenity) => venue.meta?.[amenity] && venueData.meta?.[amenity]
        );

        // Match at least 3 conditions to pass filtering
        const matchScore = [
          locationMatch,
          ratingMatch,
          hasSharedAmenities
        ].filter(Boolean).length;

        // Allow similar venues if they match 3+ factors OR are in the same city
        return locationMatch || matchScore >= 3;
      });

      // Sort by highest rating
      filteredVenues.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      // Limit to top 6 similar venues
      setSimilarVenues(filteredVenues.slice(0, 6));
    }
  }, [venueData, allVenues]);

  if (isLoading || isFetchingAll) return <Loader />;
  if (isError || fetchError)
    return (
      <ErrorMessage message="Venue not found">
        <P>{errorMessage || fetchError}</P>
        <Link to="/venues">
          <Button buttonType="violet" className="my-5 px-4 inline-block">
            Go back to venues
          </Button>
        </Link>
      </ErrorMessage>
    );

  if (!venueData) return null;

  // Breadcrumb navigation
  const breadcrumbItems = [
    { label: "", href: "/" },
    { label: "Venues", href: "/venues" },
    { label: venueData.name, current: true }
  ];

  return (
    <div>
      <MetaTags
        title={`${venueData.name} - Holidaze`}
        keywords="holidaze, venue, hotel, booking, holiday, vacation"
        description={`Book your stay at ${venueData.name}. Enjoy great amenities and a wonderful experience!`}
      />
      <div className="container max-w-screen-xl mx-auto px-5 md:px-10">
        <Breadcrumb items={breadcrumbItems} />
        <SelVenue venue={venueData} refetchVenue={fetchData} />

        <SimilarVenues similarVenues={similarVenues} />
      </div>
    </div>
  );
};

export default SelVenuePage;
