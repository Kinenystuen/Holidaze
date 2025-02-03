import { UserProfile } from "../library/types";
import VenuesData from "../../_root/pages/venues/VenuesData";
import H2 from "../shared/Typography/H2";
import ProfileCard from "../ui/ProfileCard";

interface SelUserProps {
  user: UserProfile;
}

const SelProfile: React.FC<SelUserProps> = ({
  user
  //   refetchProfile: fetchData
}) => {
  return (
    <div className="flex-1 mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
      <div className="grid grid-cols-4 md:grid-cols-4 grid-rows-1 gap-5 mx-5 items-center pb-6 border-b dark:border-customBgDark-500">
        {/* Profile card */}
        <ProfileCard userData={user} />
        {/* Open box */}
        <div className="col-span-4 md:col-span-3 lg:col-span-1 flex whitespace-nowrap items-center justify-center"></div>
      </div>
      <div className="max-w-3xl flex flex-col flex-wrap gap-5 mt-10 my-20 mx-5">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-800 shadow-md text-">
            <img
              className="object-cover w-full h-full"
              src={user.avatar.url}
              alt={user.avatar.alt}
            />
          </div>
          <H2 className="md:text-lg font-semibold capitalize">
            {user.name}'s venues ({user.venues.length}):
          </H2>
        </div>
        {user.venues.length > 0 ? (
          <VenuesData venues={user.venues} />
        ) : (
          <div className="flex items-center justify-center p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
            <H2 className="text-lg font-semibold capitalize">
              {user.name} has no venues yet.
            </H2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelProfile;
