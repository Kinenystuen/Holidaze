import FixedImage from "../../../components/shared/FixedImage";
import HeroHome from "../../../components/HeroHome";
import PopDest from "./PopDest";
import MetaTags from "../../../components/metaTags";
import PopularDestinations from "./PopularDestinations";
import PopularStayTypes from "./PopularStayTypes";

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

      {/* Fixed Image Background Section */}
      <FixedImage
        className="h-[60vh]"
        alt="Vacation image"
        overlayColor="rgba(0, 0, 0, 0.5)"
        imageUrl="https://images.unsplash.com/photo-1473221326025-9183b464bb7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  );
};

export default Home;
