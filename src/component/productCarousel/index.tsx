import React, { FC } from "react";
import styles from "./productCarousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ProductCard from "../productCard";
interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  disconnect: string;
  quantity: string;
  rate: string;
}

interface ProductCarouselProps {
  product: Product[];
}

const ProductCarousel: FC<ProductCarouselProps> = ({ product = [] }) => {
  return (
    <div className={styles.productContainer}>
      <div className={styles.title}>
        <p>Best Seller</p>
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
