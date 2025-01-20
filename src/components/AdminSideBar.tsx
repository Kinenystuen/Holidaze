import { useState, useEffect } from "react";
import {
  faBars,
  faTimes,
  faUser,
  faBuilding,
  faCalendar,
  faHeart,
  faCog,
  faPlus,
  faChartBar,
  faSignOut
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "./library/types";
import H2 from "./shared/Typography/H2";
import P from "./shared/Typography/P";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSideBar.css";
import Button from "./shared/Button/Button";
import { useUserContext } from "./context/useUserContext";

const AdminSidebar = ({ user }: { user: User }) => {
  const { setIsAuthenticated } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    setIsAuthenticated(false);
    navigate("/");
  };

  // Disable body scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <div>
        <Button
          className="md:hidden fixed top-[4.4rem] left-0 z-10 bg-color1-500 text-white p-2 rounded-none rounded-e-md shadow-md"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </Button>

        {/* Sidebar Overlay (For closing when clicking outside) */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 w-64 h-full max-h-screen bg-color1-600 text-whiteFont-500 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:flex md:flex-col md:min-w-[220px] max-w-[270px] 
        overflow-y-auto overflow-x-hidden custom-scrollbar`}
      >
        {/* Close Button */}
        <Button
          buttonType="transparent"
          className="md:hidden absolute top-1 right-1 text-white"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
        </Button>

        {/* Profile Section */}
        <div className="flex items-center space-x-3 p-6">
          <img
            src={user.avatar?.url}
            alt={user.avatar?.alt || "User avatar"}
            className="w-12 h-12 rounded-full object-cover shadow-sm"
          />
          <div>
            <H2 className="md:text-xl text-whiteFont-500">{user.name}</H2>
            <P className="text-sm text-gray-300">{user.email}</P>
          </div>
        </div>

        {/* Common User Links */}
        <nav className="space-y-2 px-6">
          <Link to="/profile" className="sidebar-link">
            <FontAwesomeIcon icon={faUser} className="w-5 mr-2" />
            My Profile
          </Link>
          <Link to="bookings" className="sidebar-link">
            <FontAwesomeIcon icon={faCalendar} className="w-5 mr-2" />
            My Bookings
          </Link>
          <Link to="#" className="sidebar-link">
            <FontAwesomeIcon icon={faHeart} className="w-5 mr-2" />
            Saved Venues
          </Link>
        </nav>

        {/* Venue Manager Links */}
        {user.venueManager && (
          <>
            <hr className="border-gray-500 my-4 mx-6" />
            <nav className="space-y-2 px-6">
              <Link to="venues" className="sidebar-link">
                <FontAwesomeIcon icon={faBuilding} className="w-5 mr-2" />
                My Venues
              </Link>
              <Link to="create-venue" className="sidebar-link">
                <FontAwesomeIcon icon={faPlus} className="w-5 mr-2" />
                Create Venue
              </Link>
              <Link to="venue-bookings" className="sidebar-link">
                <FontAwesomeIcon icon={faCalendar} className="w-5 mr-2" />
                Venue Bookings
              </Link>
              <Link to="#" className="sidebar-link">
                <FontAwesomeIcon icon={faChartBar} className="w-5 mr-2" />
                Earnings Report
              </Link>
            </nav>
          </>
        )}

        {/* Settings */}
        <hr className="border-gray-500 my-4 mx-6" />
        <div className="space-y-2 px-6">
          <Link to="settings" className="sidebar-link px-6">
            <FontAwesomeIcon icon={faCog} className="w-5  mr-2" />
            Account Settings
          </Link>
        </div>

        {/* Logout */}
        <hr className="border-gray-500 my-4 mx-6" />
        <div className="space-y-2 px-6">
          <Button
            onClick={handleLogout}
            buttonType="violet"
            className="sidebar-link w-full bg-transparent"
          >
            <FontAwesomeIcon icon={faSignOut} className="w-5 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
