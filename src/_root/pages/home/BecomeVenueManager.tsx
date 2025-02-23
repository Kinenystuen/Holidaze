import { Link } from "react-router-dom";
import H2 from "../../../components/shared/Typography/H2";
import P from "../../../components/shared/Typography/P";
import Button from "../../../components/shared/Button/Button";
import { getBaseUrl } from "../../../components/shared/BaseNameUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCog,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUserContext } from "../../../components/context/useUserContext";

const BecomeVenueManager = () => {
  const { isAuthenticated, user } = useUserContext();
  const [showSteps, setShowSteps] = useState(false);

  const handleShowSteps = () => {
    setShowSteps((prev) => !prev);
  };

  return (
    <div className="container max-w-4xl mx-auto my-20">
      <div className="relative bg-color2-500 dark:bg-color1-700 py-10 px-6 md:px-10 mx-6 md:mx-10 rounded-lg overflow-hidden">
        {/* Content */}
        <div className="relative text-center max-w-3xl mx-auto z-10 text-white">
          <div className="flex flex-col-reverse gap-3 md:flex-row items-center justify-between content-center">
            {/* If User is not Logged In */}
            {!isAuthenticated && (
              <div className="text-center md:text-start flex flex-col md:mx-10">
                <H2 className="text-3xl md:text-3xl font-bold mb-4 text-balance">
                  Want to Rent Out Your Place?
                </H2>
                <P className="text-lg md:text-xl">
                  Become a Venue Manager today and start earning by hosting
                  guests from around the world.
                </P>
                <Button
                  buttonType="violet"
                  className="mt-4 w-fit md:w-full mx-auto"
                  onClick={handleShowSteps}
                >
                  Become a Venue Manager
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`ml-2 transform duration-500 ${
                      showSteps ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>
            )}

            {/* If User is Logged In but not a Venue Manager */}
            {isAuthenticated && !user.venueManager && (
              <div className="md:text-start flex flex-col mx-10 items-center md:items-start">
                <H2 className="text-3xl md:text-3xl font-bold mb-4 text-balance">
                  Welcome Back, {user.name}!
                </H2>
                <P className="text-lg md:text-xl">
                  Upgrade to become a Venue Manager and start hosting today!
                </P>
                <Button
                  buttonType="violet"
                  className="mt-4 w-fit md:w-full"
                  onClick={handleShowSteps}
                >
                  Upgrade Now
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`ml-2 transform duration-500 ${
                      showSteps ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>
            )}

            {/* If User is Already a Venue Manager */}
            {isAuthenticated && user.venueManager && (
              <div className="md:text-start flex flex-col mx-10">
                <H2 className="text-3xl md:text-3xl font-bold mb-4 text-balance">
                  Welcome back, {user.name}!
                </H2>
                <P className="text-lg md:text-xl">
                  Track bookings, update venues, and provide the best experience
                  for your guests.
                </P>
                <Link to="/profile">
                  <Button buttonType="violet" className="mt-4">
                    Go to Your Profile
                  </Button>
                </Link>
              </div>
            )}

            {/* Image */}
            <div className="w-fit h-52 md:w-[38rem] md:h-fit overflow-hidden flex justify-end items-center">
              <img
                src={getBaseUrl("/assets/venue_page.png")}
                alt="Venue page design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Step-by-Step Guide (Only for Non-Manager Users) */}
          <AnimatePresence>
            {showSteps &&
              (!isAuthenticated || (isAuthenticated && !user.venueManager)) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="overflow-hidden mt-8"
                >
                  <hr className="w-10/12 border-color1-300 dark:border-color1-600 mb-10 mx-auto" />
                  <div className="flex flex-col content-start mx-auto max-w-sm justify-center gap-6">
                    {/* Step 1 */}
                    {!isAuthenticated && (
                      <div className="flex flex-row items-start text-lg gap-4 ">
                        <span className="font-medium p-1 px-2 m-1 flex rounded-md bg-[#bfbdeb] text-customBgDark-600">
                          1.
                        </span>
                        <P className="max-w-sm text-start">
                          Log in or sign up to get started.{" "}
                          <Link to="/auth" className="">
                            <Button
                              buttonType="violetSecondary"
                              className="text-sm"
                            >
                              Login
                            </Button>
                          </Link>
                        </P>
                      </div>
                    )}

                    {/* Step 2 */}
                    <div className="flex flex-row items-start text-lg gap-4">
                      <span className="font-medium p-1 px-2 m-1 flex rounded-md bg-[#bfbdeb] text-customBgDark-600">
                        {!isAuthenticated ? "2." : "1."}
                      </span>
                      <P className="max-w-sm text-start">
                        Go to your profile and click on{" "}
                        <Link
                          to="/profile/settings"
                          className="bg-[#bfbdeb] text-black dark:text-gray-200 bg-opacity-20 text-base p-[0.4rem] px-2 whitespace-nowrap rounded-md"
                        >
                          <FontAwesomeIcon icon={faCog} className="w-4 me-2" />
                          Account Settings
                        </Link>
                      </P>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-row items-start text-lg gap-4">
                      <span className="font-medium p-1 px-2 m-1 flex rounded-md bg-[#bfbdeb] text-customBgDark-600">
                        {!isAuthenticated ? "3." : "2."}
                      </span>
                      <P className="max-w-sm text-start">
                        Click the "Upgrade" button to become a Venue Manager.
                      </P>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-row items-start text-lg gap-4">
                      <span className="font-medium p-1 px-2 m-1 flex rounded-md bg-[#bfbdeb] text-customBgDark-600">
                        {!isAuthenticated ? "4." : "3."}
                      </span>
                      <P className="max-w-sm text-start mb-2">
                        Then click{" "}
                        <Link
                          to="/profile/create-venue"
                          className="bg-[#bfbdeb] text-black dark:text-gray-200 bg-opacity-20 text-base p-[0.4rem] px-2 rounded-md whitespace-nowrap"
                        >
                          <FontAwesomeIcon icon={faPlus} className="w-4 me-2" />
                          Create Venue
                        </Link>{" "}
                        to start listing your property!
                      </P>
                    </div>
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BecomeVenueManager;
