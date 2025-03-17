import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import tech01 from "../../assets/images/tech-01.png";
import tech02 from "../../assets/images/tech-02.png";
import tech03 from "../../assets/images/tech-03.png";
import tech04 from "../../assets/images/tech-04.png";

const ImageCarousel = () => {
  const images = [tech01, tech04, tech02, tech04, tech03];

  return (
    <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        navigation={false}
        pagination={false}
        autoplay={{
          delay: 2000, // Time between slides in ms (2 seconds)
          disableOnInteraction: false, // Keeps autoplay even when user interacts
        }}
        breakpoints={{
          320: { slidesPerView: 1 }, // Small screens (mobile)
          480: { slidesPerView: 2 }, // Small tablets
          768: { slidesPerView: 3 }, // Tablets
          1024: { slidesPerView: 4 }, // Laptops and larger screens
        }}
       
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="slider-img"
              style={{width:"auto",height:"50px",margin:"auto"}}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
