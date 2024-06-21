import React, { FC } from "react";
import styles from "./productCard.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import { ProductCardProps } from "@/utils/type";

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      {product.image && (
        <img className={styles.image} src={product.image} alt={product.name} />
      )}
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>{product.price}</p>
    </div>
  );
};

export default ProductCard;
