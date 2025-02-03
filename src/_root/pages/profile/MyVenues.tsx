import { Link } from "react-router-dom";
import { useEffect } from "react";
import { apiHostUrl } from "../../../components/library/constants";
import { useApi } from "../../../components/hooks/UseApi";

import Loader from "../../../components/ui/Loader";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import P from "../../../components/shared/Typography/P";
import Button from "../../../components/shared/Button/Button";

import { useUserContext } from "../../../components/context/useUserContext";
import { motion } from "framer-motion";
import { Venue } from "../../../components/library/types";
import H2 from "../../../components/shared/Typography/H2";
import VenueCard from "../../../components/createVenue/VenueCard";

const MyVenues = () => {
  const { user } = useUserContext();

  const { response, isLoading, isError, errorMessage, fetchData } = useApi<{
    venues: Venue[];
  }>(
    `${apiHostUrl}/holidaze/profiles/${user?.name}?_owner=true&_venues=true&_bookings=true`,
    {},
    true
  );
  console.log(response);

  useEffect(() => {
    if (user?.name) {
      fetchData();
    }
  }, [user?.name, fetchData]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorMessage message="Failed to fetch your venues">
        <P>{errorMessage || "An unexpected error occurred."}</P>
        <Link to="/venues">
          <Button buttonType="violet" className="my-5 px-4 inline-block">
            Go back to venues
          </Button>
        </Link>
      </ErrorMessage>
    );

  if (!response || !response.data?.venues || response.data.venues.length === 0)
    return (
      <div className="container mx-auto">
        <div className="max-w-screen-xl mx-auto px-10">
          <P className="mt-4">You have no venues yet.</P>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto max-w-4xl">
      <div className=" px-10 mb-20">
        <div className=" mx-auto mt-4 grid grid-cols-1 gap-6">
          <div className="flex gap-4 justify-between items-center">
            Venues: {response.data.venues.length}
            <Link to="/profile/create-venue">
              <Button buttonType="violet" className=" px-4 inline-block">
                Create New Venue
              </Button>
            </Link>
          </div>
          {response.data.venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VenueCard venue={venue} refetchVenue={fetchData} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyVenues;
