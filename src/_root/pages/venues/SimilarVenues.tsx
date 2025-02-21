import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Venue } from "../../../components/library/types";
import H2 from "../../../components/shared/Typography/H2";
import P from "../../../components/shared/Typography/P";
import H3 from "../../../components/shared/Typography/H3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import SwiperNavigation from "../../../components/ui/Swipernavigation";
interface SimilarVenuesProps {
  similarVenues: Venue[];
}

/**
 * SimilarVenues Component
 * - Displays a list of similar venues to the current venue.
 * - Uses `Swiper` from 'swiper/react' for the slider.
 * - @component
 * @returns {JSX.Element} The SimilarVenues component.
 */

const SimilarVenues: React.FC<SimilarVenuesProps> = ({ similarVenues }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <>
      {/* Similar Venues Section */}
      {similarVenues.length > 0 ? (
        <div className="relative mt-12 md:my-20">
          <H2 className="text-2xl font-semibold mb-4">You Might Also Like</H2>
          <SwiperNavigation
            isBeginning={isBeginning}
            isEnd={isEnd}
            btnPlacement="[-2rem]"
          />
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-unique",
              prevEl: ".swiper-button-prev-unique"
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="overflow-visible"
          >
            {similarVenues.slice(0, 6).map((venue) => (
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
                                .join(", ") || "No location"}
                            </P>
                          </div>
                        ) : (
                          <P className="text-gray-500 italic">No location</P>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SimilarVenues;
