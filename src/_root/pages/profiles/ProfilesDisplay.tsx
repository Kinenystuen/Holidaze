import React from "react";
import { UserProfile } from "../../../components/library/types";
import H2 from "../../../components/shared/Typography/H2";
import P from "../../../components/shared/Typography/P";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCertificate } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface SelUserProps {
  profiles: UserProfile[];
}

const ProfilesDisplay: React.FC<SelUserProps> = ({ profiles }) => {
  if (!profiles.length) {
    return (
      <div className="text-center p-8">
        <p>No profiles found.</p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 m-2">
      {profiles.map((profile) => (
        <Link
          to={`/profile/${encodeURIComponent(profile.name)}`}
          key={profile.name}
        >
          <div className="relative w-full hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="flex bg-white dark:bg-customBgDark-500 rounded-lg shadow-sm  overflow-hidden">
              <div className="w-14 h-14 m-3 my-4 rounded-full overflow-hidden">
                <img
                  src={profile.avatar?.url}
                  alt={profile.avatar?.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 w-full flex flex-1 flex-col justify-center">
                <div className="relative w-fit">
                  <H2 className="md:text-base capitalize">{profile.name}</H2>
                  {profile.venueManager && (
                    <div className="absolute -top-[0.05rem] -right-5">
                      <FontAwesomeIcon
                        icon={faCertificate}
                        className="w-4 h-4 p-0 m-0 text-color1-800"
                      />
                      <span className="absolute top-[0.28rem] left-[0.32rem] text-[9px] font-medium text-white">
                        V
                      </span>
                    </div>
                  )}
                </div>
                <P className="text-sm text-gray-700 dark:text-whiteFont-500">
                  {profile.email}
                </P>
              </div>
              {profile._count?.venues > 0 && (
                <div className="flex flex-col justify-center  w-fit min-w-28 items-center bg-color2-500 gap-1  px-3 py-1 text-sm font-medium ">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="w-4 h-4 text-color1-700"
                  />
                  <span>
                    {profile._count.venues} Venue
                    {profile._count.venues > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfilesDisplay;
