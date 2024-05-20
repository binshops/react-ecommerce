import React, { FC } from "react";
import styles from "./productCard.module.scss";import "swiper/css";
import "swiper/css/pagination";

interface Product {
  id:string,
  name:string
  price:string,
  image:string,
  disconnect:string,
  quantity:string,
  rate:string
}
interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({product}) => {
  return (
    
    <div className={styles.productCard}>
      {product.image&&
      <img className={styles.image} src={product.image} alt={product.name} />
      }
      <h3 className={styles.name}>
        {product.name}
      </h3>
    </div>
  );
};

export default ProductCard;
