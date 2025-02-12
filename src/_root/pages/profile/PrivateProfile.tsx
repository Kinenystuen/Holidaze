import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserContext } from "../../../components/context/useUserContext";
import P from "../../../components/shared/Typography/P";
import {
  faBuilding,
  faCalendar,
  faCog,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CardBox from "../../../components/ui/CardBox";
import FetchProfileData from "../../../components/context/FetchProfileData";
import LoaderSmall from "../../../components/ui/LoaderSmall";
import EditProfile from "./EditProfile";
import Button from "../../../components/shared/Button/Button";
import ProfileCard from "../../../components/ui/ProfileCard";

const PrivateProfile = () => {
  const { user } = useUserContext();

  return (
    <div className="flex md:flex 2xl:max-w-7xl mx-auto flex-col mt-0 mb-20">
      <div>
        <div className="grid grid-cols-4 md:grid-cols-3  grid-rows-1 gap-5 mx-5 items-center">
          {/* Profile card */}
          <ProfileCard userData={user} />

          {/* Edit Profile and Settings */}
          <div className="col-span-4 md:col-span-3 lg:col-span-4 flex whitespace-nowrap items-center justify-center">
            <div className="w-fit flex flex-col xs:flex-row items-center gap-2">
              <EditProfile />
              <Link to={"settings"} className="w-full">
                <Button className="w-full py-2">
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
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
