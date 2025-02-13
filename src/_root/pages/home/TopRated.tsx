import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "./TopRated.css";
import { useApi } from "../../../components/hooks/UseApi";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import P from "../../../components/shared/Typography/P";
import H3 from "../../../components/shared/Typography/H3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import Loader from "../../../components/ui/Loader";
import { Venue } from "../../../components/library/types";
import { apiHostUrl } from "../../../components/library/constants";

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

const TopRated = () => {
  const { response, isLoading, isError, errorMessage } = useApi<Venue[]>(
    `${apiHostUrl}/holidaze/venues`
  );

  const [topVenues, setTopVenues] = useState<Venue[]>([]);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (response?.data) {
      const filteredVenues = response.data.filter(
        (venue) =>
          venue.location && venue.location.city && venue.location.country
      );

      // Sort by rating (highest to lowest)
      const sortedVenues = [...filteredVenues].sort(
        (a, b) => b.rating - a.rating
      );

      // Shuffle and take the top 10
      const shuffledVenues = sortedVenues
        .slice(0, 10)
        .sort(() => Math.random() - 0.5);

      setTopVenues(shuffledVenues);
    }
  }, [response]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message={errorMessage} name="venues" />;

  return (
    <div className="relative px-10">
      {/* Swiper Container */}
      <Swiper
        modules={[Navigation, Pagination]}
        className="overflow-visible"
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next-unique",
          prevEl: ".swiper-button-prev-unique"
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          300: { slidesPerView: 1, spaceBetween: 10 },
          680: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 }
        }}
      >
        {topVenues.map((venue) => (
          <SwiperSlide key={venue.id}>
            <Link to={`/venue/${venue.id}`} className="w-full">
              <div className="w-full h-100 bg-white dark:bg-customBgDark-500 shadow-md rounded-lg overflow-hidden bg-opacity-50 hover:opacity-80 transition-opacity duration-300 mb-10">
                {venue.media?.length > 0 ? (
                  <img
                    src={venue.media[0].url}
                    alt={venue.media[0].alt || "Venue image"}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <P className="text-gray-500">No Image</P>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-center gap-2">
                    <H3 className="text-sm font-semibold truncate">
                      {venue.name}
                    </H3>
                    <div className="text-sm text-customBgDark-900 dark:text-whiteFont-500 whitespace-nowrap">
                      <FontAwesomeIcon
                        icon={faStar}
                        size="sm"
                        className="mr-2 my-0"
                      />
                      {venue.rating}
                    </div>
                  </div>
                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-600 md:mt-1 ">
                    {venue.location ? (
                      <div className="flex items-center w-full overflow-hidden">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="mr-2 text-gray-500 w-3 h-3 flex-shrink-0"
                        />
                        <P className="text-gray-600 text-sm truncate w-full overflow-hidden whitespace-nowrap text-ellipsis">
                          {[
                            venue.location.address,
                            venue.location.zip,
                            venue.location.city,
                            venue.location.country
                          ]
                            .filter(Boolean)
                            .join(", ") || "Location not available"}
                        </P>
                      </div>
                    ) : (
                      <P className="text-gray-500 italic">
                        Location not available
                      </P>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        className={`swiper-button-prev-unique absolute left-1 top-1/2 transform -translate-y-1/2 bg-transparent dark:bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-whiteFont-500 p-2 rounded-full hover:shadow-md z-10 ${
          isBeginning ? "hidden" : "block"
        }`}
        aria-label="Previous Slide"
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        className={`swiper-button-next-unique absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent dark:bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-whiteFont-500 p-2 rounded-full hover:shadow-md z-10 ${
          isEnd ? "hidden" : "block"
        }`}
        aria-label="Next Slide"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
};

export default TopRated;
