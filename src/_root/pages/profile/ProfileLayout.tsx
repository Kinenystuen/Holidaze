import { Outlet } from "react-router-dom";
import { useUserContext } from "../../../components/context/useUserContext";
import AdminSidebar from "../../../components/AdminSideBar";
import H1 from "../../../components/shared/Typography/H1";
import { useState } from "react";
import ThemeToggle from "../../../components/shared/ThemeToggle";
import MetaTags from "../../../components/metaTags";
import ScrollToTop from "../../../components/ui/ScrollToTop";

/**
 * ProfileLayout component that serves as a layout wrapper for admin-related pages.
 * It includes:
 * - An admin sidebar for navigation.
 * - A main content area that dynamically changes based on the route.
 * - A theme toggle for switching between light and dark mode.
 * - Meta tags for SEO optimization.
 * - A scroll-to-top functionality.
 * - A protected route for authenticated users.
 * - Uses the <Outlet> from react-router-dom to display child routes.
 *
 * @component
 * @returns {JSX.Element} The ProfileLayout component.
 *
 * @example
 * // Usage in routing
 * <Route path="/profile/*" element={<ProfileLayout />} />
 */
const ProfileLayout = () => {
  const { user } = useUserContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative container mx-auto min-w-full">
      <MetaTags
        title={`Admin Pages - Holidaze`}
        keywords="Holidaze, venue, hotel, booking, holiday, vacation, admin"
        description={`Book your stay at Holidaze. Enjoy great amenities and a wonderful experience!`}
      />
      <ScrollToTop />
      <div className="mx-auto">
        <div className="w-full md:flex">
          {/* Left-side menu */}
          <div
            className={`absolute md:relative md:block ${
              isCollapsed ? "w-16" : "w-64"
            } `}
          >
            <AdminSidebar
              user={user}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </div>

          {/* Right-side content - Changes based on route */}
          <div className="flex flex-col flex-1 w-full">
            <div className="border-b-2 px-6 dark:border-customBgDark-500 w-full mt-3 pb-3 mb-6 flex items-center justify-between">
              <H1 className="text-customBgDark-500 dark:text-whiteFont-600 font-extrabold">
                Dashboard
              </H1>
              <ThemeToggle />
            </div>
            <div className="relative flex flex-col w-full flex-1 gap-2 custom-scrollbar mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
