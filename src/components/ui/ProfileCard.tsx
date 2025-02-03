import React from "react";
import { User } from "../library/types";
import H1 from "../shared/Typography/H1";
import P from "../shared/Typography/P";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../context/useUserContext";

interface SelUserProps {
  userData: User;
}

const ProfileCard: React.FC<SelUserProps> = ({ userData }) => {
  const { user } = useUserContext();
  return (
    <div className="col-span-4 md:col-span-3 lg:col-span-2 flex flex-col h-fit bg-white dark:bg-customBgDark-500 shadow-sm rounded-xl w-full items-center">
      {/* Banner area */}
      <div className="flex w-full">
        {/* Banner */}
        <div className="h-44 sm:h-16 w-full bg-gray-200 dark:bg-gray-800 rounded-t-xl overflow-hidden">
          <img
            src={userData.banner?.url}
            alt={`${userData.name} profile banner`}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {/* Avatar and description area */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center w-full">
        {/* Avatar */}
        <div className=" min-h-[8rem] sm:h-full sm:min-w-60 sm:min-h-40 flex-1 px-6 sm:w-fit p-2 sm:my-4 max-w-72 rounded-xl overflow-hidden">
          <img
            src={userData.avatar?.url}
            alt="User Avatar"
            className="absolute top-[-8rem] sm:top-[-1.5rem] left-1/2 transform -translate-x-1/2 sm:left-6 sm:translate-x-0 w-64 xs:w-72 h-60 sm:w-52 sm:h-52 rounded-xl object-cover border-10 border-white dark:border-gray-800"
          />
        </div>
        {/* User Info */}
        <div className="flex flex-grow flex-col justify-center items-center sm:items-start text-center sm:text-start mb-4 sm:ml-1">
          <H1 className="font-heading capitalize">{userData.name}</H1>
          <span className="text-sm font-thin">{userData.email}</span>
          <P className="mt-4 max-w-72">{userData.bio}</P>
          {userData.venueManager && user.name === userData.name && (
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
  );
};

export default ProfileCard;
