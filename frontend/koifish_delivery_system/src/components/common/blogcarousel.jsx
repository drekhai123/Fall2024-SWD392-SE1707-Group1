import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
export default function Blogcarousel() {
    const placeholder = "https://via.placeholder.com/400x300"
  return (
    <Swiper
    spaceBetween={50}
    slidesPerView={1}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >
    <SwiperSlide>
      <img src={placeholder} alt="Slide 1" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={placeholder} alt="Slide 2" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={placeholder} alt="Slide 3" />
    </SwiperSlide>
  </Swiper>
  )
}
