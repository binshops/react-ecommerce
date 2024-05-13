import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import slide1 from './../../../public/images/slider/slide1.jpg'
import styles from "./mainSlider.module.scss";
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";



const MainSlider: FC = () => {
  return (
    <Swiper pagination={true} modules={[Pagination]} className={styles.sliderContainer}>
      <SwiperSlide><Image src={slide1} alt="" className={styles.image}/></SwiperSlide>
      <SwiperSlide><Image src={slide1} alt="" className={styles.image}/></SwiperSlide>
      <SwiperSlide><Image src={slide1} alt="" className={styles.image}/></SwiperSlide>
      <SwiperSlide><Image src={slide1} alt="" className={styles.image}/></SwiperSlide>
      <SwiperSlide><Image src={slide1} alt="" className={styles.image}/></SwiperSlide>
    </Swiper>
  );
};

export default MainSlider;
