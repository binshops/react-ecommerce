import React, { FC } from "react";
import styles from "./price.module.scss";
import { PriceProps } from "./price.type";

const Price: FC<PriceProps> = ({ price }) => {
  return (
    <div className={styles.priceBox}>
      <p className={styles.price}>{price}</p>
    </div>
  );
};

export default Price;
