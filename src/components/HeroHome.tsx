import SearchBarHome from "../_root/pages/home/SearchBarHome";
import FixedImage from "./shared/FixedImage";
import H1 from "./shared/Typography/H1";
import P from "./shared/Typography/P";

const HeroHome = () => {
  return (
    <FixedImage
      className="min:h-[28rem]  mx-auto  "
      alt="Vacation image"
      overlayColor="rgba(255, 255, 255, 0.6)"
      imageUrl="https://images.unsplash.com/photo-1517495306984-f84210f9daa8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      backgroundPosition="50% 90%"
    >
      <div className="relative z-10  pt-20">
        <div className="container mx-auto flex flex-col items-center justify-center my-6 md:my-10 2xl:my-20 px-4">
          <div className="relative text-center max-w-lg">
            <H1 className="font-heading text-4xl md:text-6xl font-bold text-balance leading-tight text-gray-800">
              Book Your Next
              <span className="mx-2 text-color3-600 dark:text-color2-500">
                Adventure
              </span>
            </H1>
            <P className="mt-2 text-lg md:text-xl text-gray-600 text-balance">
              Explore unique destinations, create unforgettable memories, and
              discover new places.
            </P>

            {/* Search Bar */}
            <SearchBarHome />
          </div>
        </div>
      </div>
    </FixedImage>
  );
};

export default HeroHome;
