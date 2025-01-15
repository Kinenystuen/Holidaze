import React from "react";
import { useUserContext } from "../context/AuthProvider";
import Loader from "../ui/Loader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserDropdown from "./UserDropdown";

const UserDropParent: React.FC = () => {
  const { isAuthenticated, isPending } = useUserContext();

  if (isPending) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="hidden md:flex">
          <Link
            to="/auth"
            className="px-3 py-[0.4rem] text-sm bg-color2 text-black rounded-none rounded-s-xl hover:bg-color2-400 hover:text-color1-700 transition flex items-center"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2 my-0" /> Login
          </Link>
          <Link
            to="/auth"
            className="px-3 py-[0.4rem] text-sm border bg-white border-color2-500 text-black rounded-none rounded-e-xl hover:bg-gray-100 hover:text-black transition flex items-center"
          >
            Register
          </Link>
        </div>
        <Link
          to="/auth"
          className="flex md:hidden items-center text-gray-800 dark:text-whiteFont-600 dark:hover:text-whiteFont-200 focus:outline-none border-0"
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faUser} />
        </Link>
      </>
    );
  }

  return <UserDropdown />;
};

export default UserDropParent;
