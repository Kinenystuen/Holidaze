import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";

/**
 * RootLayout - The main layout for the application.
 * - Includes the Header, Main Section, and Footer.
 * - Uses the <Outlet> to display child routes.
 *   The <Outlet> from react-router-dom displays any child routes, almost like
 *   passing through "children" in a component.
 * - Uses the <ScrollToTop> component to scroll to the top of the page.
 *
 * @component
 * @returns {JSX.Element} The RootLayout component.
 *
 * @example
 * // Usage in App.tsx
 * <RootLayout />
 */
const RootLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  <ScrollToTop />;
  return (
    <div className="flex flex-col min-h-screen max-w-full">
      {/* Header */}
      <Header />

      {/* Main Section */}
      <main className={`flex-grow z-10 relative ${isHomePage ? "" : "pt-16"}`}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
