import H1 from "./shared/Typography/H1";
import P from "./shared/Typography/P";

const HeroHome = () => {
  return (
    <div className="relative z-10">
      <div className="container mx-auto flex flex-col items-center justify-center my-6 md:my-10 2xl:my-20 px-4">
        <div className="text-center max-w-lg">
          <H1 className="font-heading text-4xl md:text-6xl font-bold text-balance leading-tight text-gray-800">
            Book Your Next Adventure
          </H1>
          <P className="mt-2 text-lg md:text-xl text-gray-600 text-balance">
            Explore unique destinations, create unforgettable memories, and
            discover new places.
          </P>

          {/* Search Bar */}
          <div className="mt-8 w-full flex justify-center">
            <div className="relative w-full max-w-md flex">
              <input
                type="text"
                placeholder="Search for venues..."
                className="w-full px-4 py-3 text-lg rounded-s-full border border-gray-300 focus:ring-2 focus:ring-color2 focus:outline-none"
              />
              <button
                type="button"
                className="px-6 py-3 bg-color1 text-white font-semibold rounded-r-full hover:bg-color3 transition duration-300"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHome;
