import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import { headerNavLinks } from "../library/constants";
import { INavLink } from "../library/types";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="relative w-full">
      <div className="lg:max-w-7xl w-full mx-auto ">
        <div className="flex justify-between items-center py-4 mx-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">
            <Link className="text-color1-600 dark:text-color1-100" to="/">
              Holidaze
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden w-full mx-6 md:flex space-x-4 justify-end content-end">
            {headerNavLinks.map((link: INavLink) => {
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

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Login/Register */}
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

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <FontAwesomeIcon
                icon={isMenuOpen ? faXmark : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="w-full mx-0 space-y-4 mt-4">
              {headerNavLinks.map((link: INavLink) => {
                const isActive = pathname === link.route;
                return (
                  <NavLink
                    key={link.label}
                    to={link.route}
                    onClick={() => setIsMenuOpen(false)}
                    className={`transition flex items-center text-md ${
                      isActive
                        ? "text-color1-800 hover:text-inherit dark:text-whiteFont-400 cursor-default"
                        : "text-gray-600 hover:text-color1-500"
                    }`}
                  >
                    <span className="sr-only">{link.title}</span>
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>
            <div className="flex">
              <Link
                to="/auth"
                className="px-3 py-1 bg-color2 text-black rounded-none rounded-s-xl hover:bg-color2-400 hover:text-color1-700 transition flex items-center"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Login
              </Link>
              <Link
                to="/auth"
                className="px-4 py-2 border bg-white border-color2-500 text-black rounded-none rounded-e-xl hover:bg-color3-400 hover:text-white transition flex items-center"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
