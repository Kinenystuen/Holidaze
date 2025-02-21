import React, { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Button from "./Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCalendar,
  faChevronDown,
  faSignOut,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import P from "./Typography/P";
import { useUserContext } from "../context/useUserContext";

/**
 * UserDropdown Component
 *
 * The UserDropdown component displays the user's name and avatar in a dropdown.
 * It includes links to the user's profile, bookings, and venues.
 *
 * Features:
 * - Avatar: Displays the user's avatar image
 * - Dropdown: Displays user actions (profile, bookings, venues, logout)
 *
 * Dependencies:
 * - `Button`: Component for clickable buttons
 * - `P`: Component for paragraph text
 * - `useUserContext`: Hook for accessing user context
 *
 * @component
 * @example
 * // Usage:
 * <UserDropdown />
 *
 * @returns {JSX.Element} The rendered UserDropdown component
 */

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
    navigate("/");
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
        className="flex justify-center items-center gap-2 w-fit p-[0.2rem] px-1 bg-transparent text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-whiteFont-100 rounded-full border-2 border-color2-500 dark:border-color1-600"
      >
        <P className="ms-3">{user.name}</P>
        <div className="relative flex justify-end items-center w-7 h-7 rounded-full ">
          <img
            src={user.avatar?.url}
            alt={user.avatar?.alt || "User avatar"}
            className=" w-7 h-7 rounded-full object-cover"
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
              <Link
                to="/profile/bookings"
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-customBgDark-400 dark:text-whiteFont-600 dark:hover:text-whiteFont-500"
              >
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="w-[14px] h-[14px] mr-2"
                />
                Your Bookings
              </Link>
            </li>
            {user.venueManager && (
              <li>
                <Link
                  to="/profile/venues"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-customBgDark-400 dark:text-whiteFont-600 dark:hover:text-whiteFont-500"
                >
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="w-[14px] h-[14px] mr-2"
                  />
                  Your Venues
                </Link>
              </li>
            )}
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
