import React, { FC } from "react";
import styles from "./productInfo.module.scss";
import { productInfo } from "@/utils/type";

const ProductInfo: FC<productInfo> = ({ title }) => {
  return (
    <div className={styles.productInfo}>
      <h2 className={styles.productTitle}>{title}</h2>
    </div>
  );
};

export default ProductInfo;
