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
import FetchProfileData from "../../../components/context/FetchProfileData";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import EditProfile from "./EditProfile";

const PrivateProfile = () => {
  const { user } = useUserContext();

  return (
    <div className="flex flex-col mt-0 mb-20">
      <div>
        <div className="grid grid-cols-4 md:grid-cols-3  grid-rows-1 gap-5 mx-5 items-center">
          {/* Profile card */}
          <div className="col-span-4 md:col-span-3 lg:col-span-2  flex flex-col h-fit bg-white dark:bg-customBgDark-500 shadow-sm rounded-xl w-full items-center">
            {/* Banner area */}
            <div className="flex w-full">
              {/* Banner */}
              <div className="h-44 sm:h-16 w-full bg-gray-200 dark:bg-gray-800 rounded-t-xl overflow-hidden">
                <img
                  src={user.banner?.url}
                  alt={`${user.name} profile banner`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            {/* Avatar and description area */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center w-full">
              {/* Avatar */}
              <div className=" min-h-[8rem] sm:h-full sm:min-w-60 sm:min-h-40 flex-1 px-6 sm:w-fit p-2 sm:my-4 max-w-72 rounded-xl overflow-hidden">
                <img
                  src={user.avatar?.url}
                  alt="User Avatar"
                  className="absolute top-[-8rem] sm:top-[-1.5rem] left-1/2 transform -translate-x-1/2 sm:left-6 sm:translate-x-0 w-64 xs:w-72 h-60 sm:w-52 sm:h-52 rounded-xl object-cover border-10 border-white dark:border-gray-800"
                />
              </div>
              {/* User Info */}
              <div className="flex flex-grow flex-col justify-center items-center sm:items-start text-center sm:text-start mb-4 sm:ml-1">
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
          </div>

          {/* Edit Profile and Settings */}
          <div className="col-span-4 md:col-span-3 lg:col-span-1 flex flex-col xs:flex-row lg:flex-col items-center justify-center gap-4">
            <EditProfile />
            <Link
              to={"settings"}
              className="px-6 py-2 bg-gray-200 dark:bg-customBgDark-200 text-gray-700 dark:text-customBgDark-700 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-customBgDark-100 transition duration-300 ease-in-out "
            >
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Settings
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-3 2xl:grid-cols-4 gap-5 my-5 mx-5 items-center">
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
                        : "bg-color4-500 dark:xs:bg-color1-600 text-color-5 hover:text-black p-6 rounded-lg shadow-md transition-all"
                    } p-6 rounded-lg shadow-md transition-all`}
                    icon={faBuilding}
                  >
                    See and manage your venues.
                  </CardBox>
                ) : (
                  <P>
                    Loading... <LoaderSmall />
                  </P>
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
                <P>
                  Loading... <LoaderSmall />
                </P>
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
              className="bg-color4-500 dark:xs:bg-color1-600 text-color5 hover:text-black p-6 rounded-lg shadow-md transition-all"
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
