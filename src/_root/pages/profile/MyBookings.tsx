import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiHostUrl } from "../../../components/library/constants";
import { useApi } from "../../../components/hooks/UseApi";

import Loader from "../../../components/ui/Loader";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import P from "../../../components/shared/Typography/P";
import Button from "../../../components/shared/Button/Button";

import { useUserContext } from "../../../components/context/useUserContext";
import { BookingData } from "../../../components/library/types";
import BookingCard from "../../../components/Booking/BookingCard";
import H3 from "../../../components/shared/Typography/H3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import H2 from "../../../components/shared/Typography/H2";

const MyBookings = () => {
  const { user } = useUserContext();
  const [showPastBookings, setShowPastBookings] = useState(false);

  const { response, isLoading, isError, errorMessage, fetchData } = useApi<{
    bookings: BookingData[];
  }>(
    `${apiHostUrl}/holidaze/profiles/${user?.name}?_owner=true&_bookings=true`,
    {},
    true
  );

  useEffect(() => {
    if (user?.name) {
      fetchData();
    }
  }, [user?.name, fetchData]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorMessage message="Failed to fetch your bookings">
        <P>{errorMessage || "An unexpected error occurred."}</P>
        <Link to="/venues">
          <Button buttonType="violet" className="my-5 px-4 inline-block">
            Go back to venues
          </Button>
        </Link>
      </ErrorMessage>
    );

  if (
    !response ||
    !response.data?.bookings ||
    response.data.bookings.length === 0
  )
    return (
      <div className="container mx-auto">
        <div className="max-w-screen-xl mx-auto px-10">
          <H2 className="text-2xl font-semibold mt-8">My Bookings</H2>
          <P className="mt-4">You have no bookings yet.</P>
        </div>
      </div>
    );

  const bookings = response.data.bookings;

  const today = new Date();

  // Separate upcoming and past bookings
  const upcomingBookings = bookings
    .filter((booking) => new Date(booking.dateFrom) >= today)
    .sort(
      (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
    );

  const pastBookings = bookings
    .filter((booking) => new Date(booking.dateTo) < today)
    .sort(
      (a, b) => new Date(b.dateFrom).getTime() - new Date(a.dateFrom).getTime()
    );

  const handleShowPastBookings = () => {
    setShowPastBookings(!showPastBookings);
  };

  return (
    <div className="container mx-auto">
      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <div className=" px-10 mb-20">
          <H3 className="max-w-screen-lg mx-auto text-lg font-semibold mt-4">
            Upcoming Bookings
          </H3>

          <div className="max-w-screen-lg mx-auto mt-4 grid grid-cols-1 gap-6">
            {upcomingBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
              >
                <BookingCard booking={booking} refetchBookings={fetchData} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <div className="bg-gray-200 dark:bg-customBgDark-700 mx-auto px-10 py-2 pb-[40vh]">
          <H3 className="max-w-screen-lg mx-auto text-lg font-semibold mt-6">
            Past Bookings
          </H3>
          <div className="flex justify-center">
            <Button
              buttonType="violetSecondary"
              className="border-none mt-2 transform duration-500"
              onClick={handleShowPastBookings}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`mr-2 transform duration-500 ${
                  showPastBookings ? "rotate-180" : ""
                }`}
              />
              {showPastBookings ? "Hide" : "Show"} past bookings
            </Button>
          </div>

          {/* Animate presence of past bookings */}
          <AnimatePresence>
            {showPastBookings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mx-auto max-w-screen-lg mt-4 grid grid-cols-1 gap-6">
                  {pastBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <BookingCard
                        booking={booking}
                        refetchBookings={fetchData}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
