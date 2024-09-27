import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import core Swiper styles
import "swiper/css/autoplay"; // Import autoplay-specific styles (optional)
import 'swiper/css/bundle';
export default function Blogcarousel() {
    const placeholder1 = "images/homepage1.png"
    const placeholder2 = "images/homepage2.png"
    const placeholder3 = "images/homepage3.png"
  return (
    <Swiper
    spaceBetween={50}
    slidesPerView={1}
    autoplay={{ delay: 5, disableOnInteraction: false }} // Autoplay every 5 seconds
  >
    <SwiperSlide>
      <img src={placeholder1} alt="Slide 1" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={placeholder2} alt="Slide 2" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={placeholder3} alt="Slide 3" />
    </SwiperSlide>
  </Swiper>
  )
}
