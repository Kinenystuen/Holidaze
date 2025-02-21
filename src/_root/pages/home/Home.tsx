import HeroHome from "../../../components/HeroHome";
import PopDest from "./PopDest";
import MetaTags from "../../../components/metaTags";
import PopularDestinations from "./PopularDestinations";
import PopularStayTypes from "./PopularStayTypes";
import BecomeVenueManager from "./BecomeVenueManager";
import HeroGradient from "../../../components/ui/HeroGradient";

/**
 * Home Component
 * - Contains all components for the Home page.
 * - Hero Section, Popular Destinations, Popular Stay Types, and Venue Manager Section.
 *
 * @component
 * @category Pages
 *
 * @returns {JSX.Element} The Home component.
 */

const Home = () => {
  return (
    <div className="relative">
      <MetaTags
        title={`Holidaze`}
        keywords="holidaze, venue, hotel, booking, holiday, vacation"
        description={`Book your stay at Holidaze. Enjoy great amenities and a wonderful experience!`}
      />
      {/* Hero Gradient */}
      <HeroGradient />
      {/* HERO SECTION */}
      <HeroHome />
      {/* GuestFav */}
      <PopDest />
      {/* Popular Destinations */}
      <PopularDestinations />
      {/* Popular Stay Types */}
      <PopularStayTypes />
      {/* Venue Manager Section */}
      <BecomeVenueManager />
    </div>
  );
};

export default Home;
