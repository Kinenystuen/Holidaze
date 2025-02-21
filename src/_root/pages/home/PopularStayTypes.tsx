import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

import { Link } from "react-router-dom";
import H2 from "../../../components/shared/Typography/H2";
import H3 from "../../../components/shared/Typography/H3";
import SwiperNavigation from "../../../components/ui/Swipernavigation";

const stayTypes = [
  {
    name: "Villa",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Hotel",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Cabin",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Apartment",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Cottage",
    image:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const PopularStayTypes = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative container max-w-screen-xl mx-auto my-20 px-10">
      <H2 className="text-2xl font-bold mb-6">Accommodation Types</H2>

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
        {stayTypes.map((type) => (
          <SwiperSlide key={type.name} className="mb-10">
            <Link
              to={`/venues?search=${type.name.toLowerCase()}`}
              className="group block"
            >
              <img
                loading="lazy"
                src={type.image}
                alt={type.name}
                className="w-full h-52 object-cover rounded-t-lg shadow-md group-hover:opacity-80 transition-opacity duration-300"
              />
              <div className="bg-white dark:bg-customBgDark-500 p-2 px-4 rounded-b-lg shadow-md">
                <H3 className="text-lg">{type.name}</H3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Reusable Navigation Component */}
      <SwiperNavigation isBeginning={isBeginning} isEnd={isEnd} />
    </div>
  );
};

export default PopularStayTypes;
