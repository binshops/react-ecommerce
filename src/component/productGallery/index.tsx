import React, { FC, useEffect, useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { productGalleryProps } from "./productGallery.types";

import styles from "./productGallery.module.scss";

const ProductGallery: FC<productGalleryProps> = ({ images }) => {
  const sliderImages = images;
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainImage, setMainImage] = useState(images[activeIndex]);
  const isLastItem = activeIndex === sliderImages.length - 1;
  const isFirstItem = activeIndex === 0;

  useEffect(
    () => setMainImage(sliderImages[activeIndex]),
    [activeIndex, images]
  );

  return (
    <div className={styles.imageWrapper}>
      <div className={styles.mainImageBox}>
        <div
          className={`${styles.arrow} ${styles.left} ${
            isFirstItem ? styles.disable : ""
          }`}
          onClick={() => !isFirstItem && setActiveIndex(activeIndex - 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} color="#fff" fontSize={24} />
        </div>
        <div
          className={`${styles.arrow} ${styles.right} ${
            isLastItem ? styles.disable : ""
          }`}
          onClick={() => !isLastItem && setActiveIndex(activeIndex + 1)}
        >
          <FontAwesomeIcon icon={faChevronRight} color="#fff" fontSize={24} />
        </div>
        <img
          alt="product image"
          src={mainImage.src}
          className={styles.mainImage}
        />
      </div>
      <div className={styles.sliderWrapper}>
        {sliderImages?.map((image, idx) => {
          return (
            <img
              alt="product image"
              src={image.src}
              className={styles.sliderImage}
              key={idx}
              onClick={() => setActiveIndex(idx)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGallery;
