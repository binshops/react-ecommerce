import React, { FC } from "react";
import styles from "./productInfo.module.scss";
import { productInfo } from "@/utils/type";
import Price from "../product/price";
import Options from "../product/options";

const ProductInfo: FC<productInfo> = ({
  title,
  price,
  options,
  description,
}) => {
  return (
    <div className={styles.productInfo}>
      <h2 className={styles.productTitle}>{title}</h2>
      <Price price={price} />
      <Options options={options} />
      <div dangerouslySetInnerHTML={{ __html: description }} className={styles.description} />    </div>
  );
};

export default ProductInfo;
