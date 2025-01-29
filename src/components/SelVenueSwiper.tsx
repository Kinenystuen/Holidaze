import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Media } from "./library/types";
import { FreeMode, Navigation, Pagination, Thumbs, Zoom } from "swiper/modules";
import { useState, useRef } from "react";
import ModalImage from "./ui/ModalImage";
import P from "./shared/Typography/P";

const SelVenueSwiper = ({ venue }: { venue: Media[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageId, setCurrentImageId] = useState<number | null>(null);
  const mainSwiperRef = useRef<SwiperClass | null>(null);

  /* Handle main image click -> Opens Modal */
  const handleImageClick = (id: number) => {
    setCurrentImageId(id);
    setIsModalOpen(true);
  };

  /* Handle Previous Image */
  const handlePrevious = () => {
    if (currentImageId !== null) {
      setCurrentImageId((currentImageId - 1 + venue.length) % venue.length);
    }
  };

  /* Handle Next Image */
  const handleNext = () => {
    if (currentImageId !== null) {
      setCurrentImageId((currentImageId + 1) % venue.length);
    }
  };

  return (
    <div className="relative w-full mx-auto md:col-span-2">
      {/* Main Swiper */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={venue.length > 1}
        navigation={venue.length > 1}
        pagination={venue.length > 1 ? { clickable: true } : false}
        zoom={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Thumbs, FreeMode, Zoom]}
        thumbs={{ swiper: thumbsSwiper }}
        className="rounded-lg shadow-md venue-swiper"
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)} // Save Swiper instance
      >
        {venue?.map((image, id) => (
          <SwiperSlide key={id} className="cursor-pointer">
            <img
              src={image.url}
              alt={image.alt || "Venue image"}
              className="w-full h-[30vh] md:h-[56vh] max-h-[30rem] object-cover rounded-md shadow-md"
              onClick={() => handleImageClick(id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      {venue?.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs, FreeMode]}
          className="mt-4"
        >
          {venue?.map((image, id) => (
            <SwiperSlide
              key={id}
              className="cursor-pointer"
              onClick={() => mainSwiperRef.current?.slideTo(id)} // Click to change main Swiper image
            >
              <img
                src={image.url}
                alt={image.alt || "Thumbnail"}
                className="w-full h-12 md:h-16 lg:h-20 object-cover rounded-md border-2 border-transparent hover:border-violet-500 transition"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Modal Image Viewer */}
      {isModalOpen && currentImageId !== null && (
        <ModalImage
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          opacity="bg-opacity-90"
          className="max-w-screen-2xl z-30"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          totalSlides={venue.length}
        >
          <div className="relative">
            <div className="flex flex-col items-center justify-center mx-10 max-w-full h-[90vh]">
              <img
                src={venue[currentImageId].url}
                alt={venue[currentImageId].alt}
                className="h-full rounded-sm shadow-md object-contain"
              />
              {venue[currentImageId].alt && (
                <P className="text-white bg-black bg-opacity-60 p-2 mt-1 rounded-sm">
                  {venue[currentImageId].alt}
                </P>
              )}
            </div>
          </div>
        </ModalImage>
      )}
    </div>
  );
};

export default SelVenueSwiper;
