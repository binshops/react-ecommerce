import React, { FC } from "react";
import styles from "./placeholder.module.scss";

const ProductPlaceholder: FC = () => {
  const productCardsNumber = Array.from({ length: 4 });

  return (
    <div className={`${styles.placeholder} container`}>
      <div className={styles.galleryContainer}>
        <div className={`${styles.gallery} ${styles.placeholder}`}></div>
      </div>
      <div className={styles.infoContainer}>
        <div className={`${styles.text} ${styles.placeholder}`}></div>
        <div className={`${styles.price} ${styles.placeholder}`}></div>
        <div className={`${styles.button} ${styles.placeholder}`}></div>
        <div className={`${styles.text} ${styles.placeholder}`}></div>
        <div className={`${styles.text} ${styles.placeholder}`}></div>
        <div className={`${styles.text} ${styles.placeholder}`}></div>
        <div className={`${styles.price} ${styles.placeholder}`}></div>
      </div>
      <div className={styles.carousel}>
        <div className={`${styles.title} ${styles.placeholder}`}></div>
        <div className={styles.productWrapper}>
          {productCardsNumber.map((_, index) => (
            <div key={index} className={styles.productCard}>
              <div className={`${styles.image} ${styles.placeholder}`}></div>
              <div className={`${styles.name} ${styles.placeholder}`}></div>
              <div className={`${styles.price} ${styles.placeholder}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPlaceholder;
