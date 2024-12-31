import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import ProductCard from "../productCard";

import { ProductCarouselProps } from "./productCarousel.types";

import styles from "./productCarousel.module.scss";

const ProductCarousel: FC<ProductCarouselProps> = ({ product = [] }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.productContainer}>
      <div className={styles.title}>
        <p>{t("carousel.title")}</p>
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={8}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {product?.map((item) => {
          return (
            <SwiperSlide key={item.id} className={styles.productItem}>
              <ProductCard product={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
