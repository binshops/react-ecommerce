import React, { FC } from "react";
import styles from "./placeholder.module.scss";

const Placeholder: FC = () => {
  const productCardsNumber = Array.from({ length: 4 });

  return (
    <div className={styles.placeholder}>
      <div className={styles.optionsWrapper}>
        <div className={`${styles.item} ${styles.placeholder}`}></div>
        <div className={`${styles.item} ${styles.placeholder}`}></div>
        <div className={`${styles.item} ${styles.placeholder}`}></div>
      </div>
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
  );
};

export default Placeholder;
