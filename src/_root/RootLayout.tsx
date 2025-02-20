import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";

// The <Outlet> from react-router-dom displays any child routes, almost like
// passing through "children" in a component.

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
