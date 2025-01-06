import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

// The <Outlet> from react-router-dom displays any child routes, almost like
// passing through "children" in a component.

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Section */}
      <main className="flex-grow z-10 mt-14 lg:mt-14 relative">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
