import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./VenueSwiper.css";

/**
 * VenueSwiper Component
 *
 * The VenueSwiper component displays a Swiper component with images of a venue.
 *
 * @component
 * @example
 * // Usage:
 * <VenueSwiper media={media} />
 *
 * @param {Object} media - The media object containing the image URL and alt text
 * @returns {JSX.Element} The rendered VenueSwiper component
 */

const VenueSwiper = ({ media }: { media: { url: string; alt: string }[] }) => {
  return (
    <div className="relative venue-swiper w-full h-full object-cover">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={media.length > 1}
        pagination={media.length > 1 ? { clickable: true } : false}
        loop={media.length > 1}
        slidesPerView={1}
        centeredSlides={false}
        className="w-full h-full object-cover"
      >
        {media.length > 0 ? (
          media.map((image, index) => (
            <SwiperSlide key={index} className="overflow-hidden">
              <div className="w-full h-full overflow-hidden">
                <img
                  src={image.url}
                  loading="lazy"
                  alt={image.alt || image.url}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              loading="lazy"
              src="https://archive.org/download/placeholder-image/placeholder-image.jpg"
              alt="Default Placeholder"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default VenueSwiper;
