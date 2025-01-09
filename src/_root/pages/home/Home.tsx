import FixedImage from "../../../components/shared/FixedImage";
import HeroHome from "../../../components/HeroHome";
import PopDest from "./PopDest";

const Home = () => {
  return (
    <div className="relative">
      {/* HERO SECTION */}
      <HeroHome />
      {/* Popular Destinations */}
      <PopDest />

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
