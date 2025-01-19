import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { VenueProfile } from "../../../components/library/types";
import { apiHostUrl } from "../../../components/library/constants";
import { useApi } from "../../../components/hooks/UseApi";

import Loader from "../../../components/ui/Loader";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import P from "../../../components/shared/Typography/P";
import Button from "../../../components/shared/Button/Button";
import MetaTags from "../../../components/metaTags";
import Breadcrumb from "../../../components/ui/BreadCrumItem";
import SelVenue from "./SelVenue";

const SelVenuePage = () => {
  const { id } = useParams<{ id: string }>();
  const [venueData, setVenueData] = useState<VenueProfile | null>(null);

  // Fetch venue data
  const { response, isLoading, isError, errorMessage } = useApi<VenueProfile>(
    `${apiHostUrl}/holidaze/venues/${id}?_owner=true&_bookings=true`
  );

  // Update state when response is available
  useEffect(() => {
    if (response?.data) {
      setVenueData(response.data);
    }
  }, [response]);

  console.log(venueData);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorMessage message="Venue not found">
        <P>{errorMessage}</P>
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
    <div className="container mx-auto">
      <MetaTags
        title={`${venueData.name} - Holidaze`}
        keywords="holidaze, venue, hotel, booking, holiday, vacation"
        description={`Book your stay at ${venueData.name}. Enjoy great amenities and a wonderful experience!`}
      />
      <div className="max-w-screen-xl mx-auto px-10">
        <Breadcrumb items={breadcrumbItems} />
        <SelVenue venue={venueData} />
      </div>
    </div>
  );
};

export default SelVenuePage;
