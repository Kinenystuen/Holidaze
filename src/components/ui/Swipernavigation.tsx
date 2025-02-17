const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
    />
  </svg>
);

const SwiperNavigation = ({
  isBeginning,
  isEnd,
  btnPlacement = "1"
}: {
  isBeginning: boolean;
  isEnd: boolean;
  btnPlacement?: string;
}) => {
  return (
    <>
      {/* Left Button */}
      <button
        className={`swiper-button-prev-unique absolute left-${btnPlacement} top-1/2 transform -translate-y-1/2 bg-transparent dark:bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-whiteFont-500 p-2 rounded-full hover:shadow-md z-10 ${
          isBeginning ? "hidden" : "block"
        }`}
        aria-label="Previous Slide"
      >
        <ArrowIcon direction="left" />
      </button>

      {/* Right Button */}
      <button
        className={`swiper-button-next-unique absolute right-${btnPlacement} top-1/2 transform -translate-y-1/2 bg-transparent dark:bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-whiteFont-500 p-2 rounded-full hover:shadow-md z-10 ${
          isEnd ? "hidden" : "block"
        }`}
        aria-label="Next Slide"
      >
        <ArrowIcon direction="right" />
      </button>
    </>
  );
};

export default SwiperNavigation;
