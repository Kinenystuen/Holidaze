import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserContext } from "../../../components/context/useUserContext";
import H1 from "../../../components/shared/Typography/H1";
import P from "../../../components/shared/Typography/P";
import {
  faBuilding,
  faCalendar,
  faCog,
  faEdit,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CardBox from "../../../components/ui/CardBox";
import Button from "../../../components/shared/Button/Button";
import FetchProfileData from "../../../components/context/FetchProfileData";

const PrivateProfile = () => {
  const { user } = useUserContext();

  return (
    <div className="flex flex-col mt-0">
      <div>
        {/* <div className="h-[50vh] max-h-80 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
          <img
            src={user.bannerUrl}
            alt={`${user.name} profile banner`}
            className="object-cover w-full h-full"
          />
        </div> */}

        <div className="grid grid-cols-3 grid-rows-1 gap-5 mx-5 mb-20 items-center">
          {/* Left Section (Takes up 2/3 of the row) */}
          <div className="col-span-3 lg:col-span-2 flex flex-col sm:flex-row h-fit bg-white dark:bg-customBgDark-500 shadow-sm rounded-xl w-full items-center">
            <div className="w-full sm:w-fit p-2 max-w-72 rounded-xl overflow-hidden">
              <img
                src={user.avatar?.url}
                alt="User Avatar"
                className="w-full h-40 sm:w-60 sm:h-60 rounded-xl overflow-hidden object-cover"
              />
            </div>
            <div className="flex mx-2 flex-col justify-center items-start sm:items-start text-start sm:text-start x-2 mb-4 sm:ml-6">
              <H1 className="font-heading">{user.name}</H1>
              <span className="text-sm font-thin">{user.email}</span>
              <P className="mt-4 max-w-72">{user.bio}</P>
              {user.venueManager && (
                <Link
                  to={"settings"}
                  className="my-4 group sm:mb-0 px-3 py-1 w-fit flex items-center cursor-pointer bg-color1 dark:bg-color1-600 text-white dark:text-whiteFont-500 text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-300 ease-in-out"
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="opacity-0 w-[1px] h-4 p-0 m-0 group-hover:w-4 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 ease-in-out group-hover:mr-2"
                  />
                  Venue Manager
                </Link>
              )}
            </div>
          </div>

          <div className="col-span-3 lg:col-span-1 flex flex-row lg:flex-col items-center justify-center gap-4">
            <Button className="px-4 py-2 text-white rounded-lg shadow-md bg-color1-400 dark:bg-color1-600 hover:bg-color1-500 dark:hover:bg-color1-500 transition">
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit Profile
            </Button>
            <Link
              to={"settings"}
              className="px-6 py-2 bg-gray-200 dark:bg-customBgDark-200 text-gray-700 dark:text-customBgDark-700 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-customBgDark-100 transition duration-300 ease-in-out "
            >
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Settings
            </Link>
          </div>

          {/* Venue Manager Section */}
          {user.venueManager && (
            <FetchProfileData>
              {(profile) =>
                profile ? (
                  <CardBox
                    link="venues"
                    title={`${
                      profile._count.venues > 0
                        ? `Your Venues • ${profile._count.venues}`
                        : "Start Hosting Today!"
                    }`}
                    className={`${
                      profile._count.venues > 0
                        ? ""
                        : "bg-color4 dark:bg-color1-700 text-color-5 hover:text-black p-6 rounded-lg shadow-md transition-all"
                    } p-6 rounded-lg shadow-md transition-all`}
                    icon={faBuilding}
                  >
                    See and manage your venues.
                  </CardBox>
                ) : (
                  <p>Loading profile...</p>
                )
              }
            </FetchProfileData>
          )}
          {/* Create Venue Section */}
          {user.venueManager && (
            <CardBox link="create-venue" title="Create Venue" icon={faPlus}>
              Create a new venue to start accepting bookings today.
            </CardBox>
          )}

          {/* Bookings Section */}
          <FetchProfileData>
            {(profile) =>
              profile ? (
                <CardBox
                  link="bookings"
                  title={`${
                    profile._count.bookings > 0
                      ? `Your Bookings • ${profile._count.bookings}`
                      : "No Bookings Yet"
                  }`}
                  icon={faCalendar}
                >
                  View and manage your bookings.
                </CardBox>
              ) : (
                <p>Loading profile...</p>
              )
            }
          </FetchProfileData>

          {/* Become a Venue Manager Section */}
          {!user.venueManager && (
            <CardBox
              link="settings"
              cols="md:col-span-2 xl:col-span-1"
              title="Ready to Host? Become a Venue Manager!"
              icon={faCalendar}
              textColor="group-hover:text-black"
              className="bg-[#e8e2f3] text-[#322F57] hover:text-black p-6 rounded-lg shadow-md transition-all"
            >
              Turn your property into a thriving venue. Sign up now to list your
              space and connect with guests.
            </CardBox>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateProfile;
