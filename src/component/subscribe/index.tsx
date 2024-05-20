import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import slide1 from './../../../public/images/slider/slide1.jpg'
import styles from "./subscribe.module.scss";
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";



const Subscribe: FC = () => {
  return (
    <div className={styles.subscribe}>
        <p className={styles.title}>
        Subscribe to Newsletters
        </p>
        <p className={styles.description}>
        Be aware of upcoming sales and events. Receive gifts and special offers!
        </p>
        <button className={styles.submit}>
        Subscribe
        </button>
    </div>
  );
};

export default Subscribe;
