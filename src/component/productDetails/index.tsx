import React, { FC } from "react";
import styles from "./productDetails.module.scss";
import ProductGallery from "../productGallery";
import ProductInfo from "../productInfo";
import { productDetailsProps } from "@/utils/type";

const ProductDetails: FC<productDetailsProps> = ({ title, images }) => {
  return (
    <div className={styles.productInfo}>
      <ProductGallery images={images} />
      <ProductInfo title={title} />
    </div>
  );
};

export default ProductDetails;
