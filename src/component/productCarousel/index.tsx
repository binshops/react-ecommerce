import React, { FC } from "react";
import styles from "./productCarousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ProductCarousel: FC = () => {
  return (
    <div className={styles.productContainer}>
        <div className={styles.title}>
            <p>
            Best Seller
            </p>
        </div>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className={styles.productItem}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.productItem}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.productItem}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.productItem}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.productItem}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.productItem}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.productItem}>Slide 1</SwiperSlide>

      </Swiper>
    </div>
  );
};

export default ProductCarousel;
