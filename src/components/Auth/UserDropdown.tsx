import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Button from "../shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSignOut,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import P from "../shared/Typography/P";

const UserDropdown: React.FC = () => {
  const { user, isAuthenticated, setIsAuthenticated } = useUserContext();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown state
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    setIsAuthenticated(false);
    navigate(`/`);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative mx-1 md:mx-0">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex justify-center items-center px-1 py-0 bg-transparent text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-whiteFont-100 border-none"
      >
        <div className="relative w-8 h-8 rounded-full">
          <img
            src={user.avatarUrl}
            alt={user.avatar?.alt || "User avatar"}
            className=" w-8 h-8 rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-color2 dark:bg-color1-400 shadow-lg rounded-full w-3 h-3 flex justify-center items-center">
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-black w-2 h-2"
            />
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 divide-y dark:divide-customBgDark-600 bg-white dark:bg-customBgDark-500 border dark:border-customBgDark-600 rounded-md shadow-lg z-20"
        >
          <div className="flex items-center p-4 ">
            <P className="mr-1">Hello </P>
            <P className="font-extrabold text-color3-600 dark:text-color2-500">
              {user.name}!
            </P>
            <strong className="ml-2"></strong>
          </div>
          <ul className="text-sm text-gray-700 dark:text-whiteFont-500 divide-y divide-gray-200 dark:divide-customBgDark-600">
            <li>
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-customBgDark-400 dark:text-whiteFont-600 dark:hover:text-whiteFont-500"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-[14px] h-[14px] mr-2"
                />
                Profile
              </Link>
            </li>
            <li>
              <Button
                onClick={handleLogout}
                buttonType="violet"
                className="flex items-center rounded-b-lg w-full rounded-none text-left hover:bg-color1-700 dark:hover:bg-color1-600"
              >
                <FontAwesomeIcon
                  icon={faSignOut}
                  className="w-[14px] h-[14px] mr-2"
                />
                Sign out
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
