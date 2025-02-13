import { useState, useEffect } from "react";
import {
  faBars,
  faUser,
  faBuilding,
  faCalendar,
  faHeart,
  faCog,
  faPlus,
  faChartBar,
  faSignOut,
  faAngleLeft,
  faAngleRight,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "./library/types";
import H2 from "./shared/Typography/H2";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSideBar.css";
import Button from "./shared/Button/Button";
import { useUserContext } from "./context/useUserContext";
import Tooltip from "./ui/ToolTip";

interface AdminSidebarProps {
  user: User;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  user,
  isCollapsed,
  setIsCollapsed
}) => {
  const { setIsAuthenticated } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
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
      {/* Hamburger Button for Mobile Screens */}
      <div>
        <Button
          className="md:hidden fixed top-[4.4rem] left-0 z-10 bg-color1-500 text-white p-2 rounded-none rounded-e-md shadow-md"
          onClick={toggleMenu}
          ariaLabel="Toggle Sidebar"
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </Button>

        {/* Sidebar Overlay (For closing when clicking outside) */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={closeMenu}
          ></div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 ${
          isCollapsed ? "w-16" : "w-64"
        } h-screen bg-color1-600 text-whiteFont-500 transform transition-all duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:flex md:flex-col max-w-[270px] 
        overflow-visible overflow-x-visible overflow-y-auto custom-scrollbar`}
      >
        {/* Collapse Button (Only for md screens and larger) */}
        <Button
          buttonType="transparent"
          className={`hidden md:flex absolute top-2 right-1 text-white ${
            isCollapsed ? "top-2 mt-11" : ""
          }`}
          onClick={toggleCollapse}
          ariaLabel="Collapse Sidebar"
        >
          <Tooltip
            text={isCollapsed ? "Open Sidebar" : "Collapse Sidebar"}
            position="right"
          >
            <FontAwesomeIcon
              icon={isCollapsed ? faAngleRight : faAngleLeft}
              className="w-5 h-5"
            />
          </Tooltip>
        </Button>

        {/* Logo */}
        <div
          className={`flex items-center justify-start text-2xl font-bold text-gray-800 transition-all duration-300 ${
            isCollapsed ? "text-4xl mx-[1.1rem] mb-10 h-16 w-16" : "mx-6 mt-3"
          }`}
        >
          <Tooltip
            text="Back to homepage"
            position={isCollapsed ? "right" : "bottom"}
          >
            <Link className="text-whiteFont-500 dark:text-whiteFont-600" to="/">
              {typeof isCollapsed === "boolean"
                ? !isCollapsed
                  ? "Holidaze"
                  : "H"
                : "Holidaze"}
            </Link>
          </Tooltip>
        </div>
        {/* Profile Section (Hidden when collapsed) */}
        <div
          className={`flex items-center space-x-3 ${
            isCollapsed ? "p-1 mb-3 w-16 justify-center" : "p-6"
          }`}
        >
          <img
            src={user.avatar?.url}
            alt={user.avatar?.alt || "User avatar"}
            className={`rounded-full object-cover shadow-sm transition-all duration-300 ${
              isCollapsed ? "w-7 h-7" : "w-12 h-12"
            }`}
          />
          {!isCollapsed && (
            <div>
              <H2 className="md:text-xl text-whiteFont-500">{user.name}</H2>
            </div>
          )}
        </div>

        {/* Sidebar Links */}
        <nav className="space-y-2 px-3">
          <Tooltip
            text="My Profile"
            position={isCollapsed ? "right" : "bottom"}
            className="w-full"
          >
            <Link to="/profile" className="sidebar-link gap-2">
              <FontAwesomeIcon icon={faUser} className="w-5" />
              {!isCollapsed && "My Profile"}
            </Link>
          </Tooltip>
          <Tooltip
            text="My Bookings"
            position={isCollapsed ? "right" : "bottom"}
            className="w-full"
          >
            <Link to="bookings" className="sidebar-link gap-2">
              <FontAwesomeIcon icon={faCalendar} className="w-5" />
              {!isCollapsed && "My Bookings"}
            </Link>
          </Tooltip>
          <Tooltip
            text="Saved Venues"
            position={isCollapsed ? "right" : "bottom"}
            className="w-full"
          >
            <Link to="#" className="sidebar-link gap-2">
              <FontAwesomeIcon icon={faHeart} className="w-5" />
              {!isCollapsed && "Saved Venues"}
            </Link>
          </Tooltip>
        </nav>

        {/* Venue Manager Links (Only if venueManager is true) */}
        {user.venueManager && (
          <>
            <hr className="border-gray-500 my-4 mx-6" />
            <nav className="space-y-2 px-3">
              <Tooltip
                text="My Venues"
                position={isCollapsed ? "right" : "bottom"}
                className="w-full"
              >
                <Link to="venues" className="sidebar-link gap-2">
                  <FontAwesomeIcon icon={faBuilding} className="w-5" />
                  {!isCollapsed && "My Venues"}
                </Link>
              </Tooltip>
              <Tooltip
                text="Create Venue"
                position={isCollapsed ? "right" : "bottom"}
                className="w-full"
              >
                <Link to="create-venue" className="sidebar-link gap-2">
                  <FontAwesomeIcon icon={faPlus} className="w-5" />
                  {!isCollapsed && "Create Venue"}
                </Link>
              </Tooltip>
              <Tooltip
                text="Earnings Report"
                position={isCollapsed ? "right" : "bottom"}
                className="w-full"
              >
                <Link to="#" className="sidebar-link gap-2">
                  <FontAwesomeIcon icon={faChartBar} className="w-5" />
                  {!isCollapsed && "Earnings Report"}
                </Link>
              </Tooltip>
            </nav>
          </>
        )}

        {/* Settings */}
        <hr className="border-gray-500 my-4 mx-6" />
        <div className="space-y-2 px-3">
          <Tooltip
            text="Account Settings"
            position={isCollapsed ? "right" : "bottom"}
            className="w-full"
          >
            <Link to="settings" className="sidebar-link gap-2">
              <FontAwesomeIcon icon={faCog} className="w-5" />
              {!isCollapsed && "Account Settings"}
            </Link>
          </Tooltip>
        </div>
        <hr className="border-gray-500 my-4 mx-6" />
        <div className="space-y-2 px-3">
          <Tooltip
            text="Go back to homepage"
            position={isCollapsed ? "right" : "bottom"}
            className="w-full"
          >
            <Link to="/" className="sidebar-link gap-2">
              <FontAwesomeIcon icon={faHome} className="w-5" />
              {!isCollapsed && "Home"}
            </Link>
          </Tooltip>
          <Tooltip
            text="Go back to homepage"
            position={isCollapsed ? "right" : "bottom"}
            className="w-full"
          >
            <Link to="/venues" className="sidebar-link gap-2">
              <FontAwesomeIcon icon={faBuilding} className="w-5" />
              {!isCollapsed && "All Venues"}
            </Link>
          </Tooltip>
        </div>

        {/* Logout */}
        <hr className="border-gray-500 my-4 mx-6" />
        <div className="space-y-2 px-3  mb-20">
          <Tooltip text="Sign out" position="right" className="w-full">
            <Button
              onClick={handleLogout}
              buttonType="violet"
              className="sidebar-link w-full bg-transparent gap-2"
            >
              <FontAwesomeIcon icon={faSignOut} className="w-5" />
              {!isCollapsed && "Sign out"}
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
