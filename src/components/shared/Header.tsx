import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import { headerNavLinks } from "../library/constants";
import { INavLink } from "../library/types";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button/Button";
import UserDropParent from "./UserDropParent";
import { useUserContext } from "../context/useUserContext";

/**
 * Header Component
 *
 * The Header component displays the site's navigation links, logo, and user actions.
 * It includes a responsive design for mobile and desktop views.
 *
 * Features:
 * - Navigation links: Displays links based on user authentication status
 * - Theme Toggle: Allows users to switch between light and dark themes
 * - UserDropParent: Displays user actions (login, register, logout) in a dropdown
 * - Mobile Menu: Hamburger menu for mobile users
 *
 * Dependencies:
 * - `ThemeToggle`: Component for toggling between light and dark themes
 * - `UserDropParent`: Component for user actions dropdown
 *
 * @component
 * @example
 * // Usage:
 * <Header />
 *
 * @returns {JSX.Element} The rendered Header component
 */

const Header: React.FC = () => {
  const { isAuthenticated } = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 0);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="relative w-full">
      <div
        className={`fixed z-30 w-full bg-customBg bg-opacity-0 dark:bg-opacity-0 dark:bg-customBgDark-600 transform duration-500 ${
          isScrolled ? "bg-opacity-100 dark:bg-opacity-100 " : ""
        }`}
      >
        <div className="lg:max-w-7xl w-full mx-auto  ">
          <div className="flex justify-between items-center py-4 mx-4">
            {/* Logo */}
            <div className="flex-1 text-2xl font-bold text-gray-800 z-30 ">
              <Link className="text-color1-600 dark:text-whiteFont-600" to="/">
                Holidaze
              </Link>
            </div>
            <div className="flex-1">
              {/* Navigation Links */}
              <nav className="hidden w-full md:flex gap-3  justify-center content-end">
                {headerNavLinks
                  .filter((link) => !link.requiresAuth || isAuthenticated) // Only show if user is authenticated
                  .map((link: INavLink) => {
                    const isActive = pathname === link.route;
                    return (
                      <NavLink
                        key={link.label}
                        to={link.route}
                        onClick={() => setIsMenuOpen(false)}
                        className={`transition flex items-center text-md ${
                          isActive
                            ? "text-color1-800 hover:text-inherit dark:text-whiteFont-400 cursor-default"
                            : "text-gray-600 dark:text-whiteFont-600 hover:text-color1-500"
                        }`}
                      >
                        <span className="sr-only">{link.title}</span>
                        {link.label}
                      </NavLink>
                    );
                  })}
              </nav>
            </div>

            {/* Right side header */}
            <div className="flex flex-1 justify-end items-center md:mx-4 space-x-4">
              {/* Theme Toggle */}
              <div className="hidden md:flex">
                <ThemeToggle />
              </div>

              {/* Login/Register */}
              <div className="hidden md:flex">
                <UserDropParent />
              </div>

              {/* Hamburger Menu & UserDropParent (Mobile) */}
              <div className="flex md:hidden  z-50">
                <div className="flex items-center">
                  <UserDropParent />
                </div>

                <Button
                  buttonType="transparent"
                  ariaLabel="Open Menu"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-800 dark:text-whiteFont-600 focus:outline-none border-0 flex items-center p-2 ms-3 md:p-0"
                >
                  <FontAwesomeIcon
                    icon={isMenuOpen ? faXmark : faBars}
                    className="h-6 w-6"
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-0 w-full pt-16 p-4 border-b dark:border-customBgDark-600 shadow-md bg-customBg dark:bg-customBgDark-500 z-20 md:hidden transform duration-300">
              <nav className="w-full mx-0 space-y-4 px-2 my-4">
                {headerNavLinks.map((link: INavLink) => {
                  const isActive = pathname === link.route;
                  return (
                    <NavLink
                      key={link.label}
                      to={link.route}
                      onClick={() => setIsMenuOpen(false)}
                      className={`transition flex items-center text-md ${
                        isActive
                          ? "text-color1-800  hover:text-inherit dark:text-whiteFont-400 cursor-default"
                          : "text-gray-600 dark:text-whiteFont-600 hover:text-color1-500 dark:hover:text-whiteFont-400"
                      }`}
                    >
                      <span className="sr-only">{link.title}</span>
                      {link.label}
                    </NavLink>
                  );
                })}
              </nav>
              {/* Theme Toggle */}
              <div className="flex md:hidden my-3">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
