import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./VenueSwiper.css";

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
            <SwiperSlide key={index}>
              <img
                src={image.url}
                alt={image.alt || "Venue Image"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
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
