import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import styles from "./mainSlider.module.scss";
import "swiper/css";
import "swiper/css/pagination";

const MainSlider: FC = () => {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      className={styles.sliderContainer}
    >
      <SwiperSlide>
        <img
          src={"/images/slider/slide1.webp"}
          alt=""
          className={styles.image}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={"/images/slider/slide1.webp"}
          alt=""
          className={styles.image}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={"/images/slider/slide1.webp"}
          alt=""
          className={styles.image}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={"/images/slider/slide1.webp"}
          alt=""
          className={styles.image}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={"/images/slider/slide1.webp"}
          alt=""
          className={styles.image}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSlider;
