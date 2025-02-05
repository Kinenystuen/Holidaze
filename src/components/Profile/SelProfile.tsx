import { UserProfile } from "../library/types";
import H2 from "../shared/Typography/H2";
import ProfileCard from "../ui/ProfileCard";
import UserVenues from "./UserVenues";
import P from "../shared/Typography/P";

interface SelUserProps {
  user: UserProfile;
}

const SelProfile: React.FC<SelUserProps> = ({ user }) => {
  return (
    <div className="flex-1 mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-2 min-h-80">
      <div className="grid grid-cols-4 md:grid-cols-4 grid-rows-1 gap-5 mx-5 items-center pb-6 border-b dark:border-customBgDark-500">
        {/* Profile card */}
        <ProfileCard userData={user} />
        {/* Open box */}
        <div className="col-span-4 md:col-span-3 lg:col-span-1 flex whitespace-nowrap items-center justify-center"></div>
      </div>
      {/* User Venues */}
      {user.venueManager && (
        <div className="flex flex-col flex-wrap gap-5 mt-10 my-20 mx-5">
          <div className="flex items-center gap-4">
            <div className="rounded-full overflow-hidden w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-800 shadow-md text-">
              <img
                className="object-cover w-full h-full"
                src={user.avatar.url}
                alt={user.avatar.alt}
              />
            </div>
            <H2 className="md:text-2xl font-semibold capitalize">
              {user.name}'s venues ({user.venues?.length}):
            </H2>
          </div>
          {(user.venues?.length ?? 0) > 0 ? (
            <UserVenues venues={user.venues ?? []} />
          ) : (
            <div className="w-fit">
              <div className="flex content-start items-start justify-start bg-white dark:bg-customBgDark-500 rounded-lg shadow-md">
                <P className="text-base font-semibold capitalize m-4 mx-10">
                  {user.name} has no venues.
                </P>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelProfile;
