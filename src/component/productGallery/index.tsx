import React, { FC, useEffect, useState } from "react";
import styles from "./productGallery.module.scss";
import { productGalleryProps } from "@/utils/type";
import arrow from "./../../../public/images/icon/arrow.png";
import Image from "next/image";

const ProductGallery: FC<productGalleryProps> = ({ images }) => {
  const sliderImages = images;
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainImage, setMainImage] = useState(images[activeIndex]);
  const isLastItem = activeIndex === sliderImages.length - 1;
  const isFirstItem = activeIndex === 0;

  useEffect(() => setMainImage(sliderImages[activeIndex]), [activeIndex]);

  return (
    <>
      <div className={styles.imageWrapper}>
        <div className={styles.mainImageBox}>
          <div
            className={`${styles.arrow} ${styles.left} ${
              isFirstItem ? styles.disable : ""
            }`}
            onClick={() => !isFirstItem && setActiveIndex(activeIndex - 1)}
          >
            <Image src={arrow} alt="left arrow" />
          </div>
          <div
            className={`${styles.arrow} ${styles.right} ${
              isLastItem ? styles.disable : ""
            }`}
            onClick={() => !isLastItem && setActiveIndex(activeIndex + 1)}
          >
            <Image src={arrow} alt="right arrow" />
          </div>
          <img alt="" src={mainImage.src} className={styles.mainImage} />
        </div>
        <div className={styles.sliderWrapper}>
          {sliderImages.map((image, idx) => {
            return (
              <img
                alt=""
                src={image.src}
                className={styles.sliderImage}
                key={idx}
                onClick={() => setActiveIndex(idx)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductGallery;
