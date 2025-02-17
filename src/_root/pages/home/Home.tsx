import HeroHome from "../../../components/HeroHome";
import PopDest from "./PopDest";
import MetaTags from "../../../components/metaTags";
import PopularDestinations from "./PopularDestinations";
import PopularStayTypes from "./PopularStayTypes";
import BecomeVenueManager from "./BecomeVenueManager";

const Home = () => {
  return (
    <div className="relative">
      <MetaTags
        title={`Holidaze`}
        keywords="holidaze, venue, hotel, booking, holiday, vacation"
        description={`Book your stay at Holidaze. Enjoy great amenities and a wonderful experience!`}
      />
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
