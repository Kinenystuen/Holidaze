import React from "react";
import { User, UsersResponse } from "../../../components/library/types";
import H2 from "../../../components/shared/Typography/H2";
import P from "../../../components/shared/Typography/P";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface SelUserProps {
  data: UsersResponse[];
}

const ProfilesDisplay: React.FC<SelUserProps> = ({ data }) => {
  const profiles = data[0].data;
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 m-2">
      {profiles.map((profile: User) => (
        <Link
          to={`/profile/${encodeURIComponent(profile.name)}`}
          key={profile.name}
        >
          <div className="w-full">
            <div className="flex bg-white dark:bg-customBgDark-500 rounded-lg shadow-sm ">
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
                        className="w-5 h-5 p-0 m-0 text-color1"
                      />
                      <span className="absolute top-[0.12rem] left-[0.37rem] text-xs font-medium text-white">
                        V
                      </span>
                    </div>
                  )}
                </div>
                <P className="text-sm text-gray-700 dark:text-whiteFont-500">
                  {profile.email}
                </P>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfilesDisplay;
