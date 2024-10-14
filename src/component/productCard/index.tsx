import React, { FC } from "react";
import styles from "./productCard.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import { ProductCardProps } from "@/utils/type";
import Price from "../product/price";
import Link from "next/link";

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} >

    <div className={styles.productCard}>
      {product.image && (
        <img className={styles.image} src={product.image} alt={product.name} />
      )}
      <h3 className={styles.name}>{product.name}</h3>
      <Price price={product.price} />
    </div>
      </Link>
  );
};

export default ProductCard;
