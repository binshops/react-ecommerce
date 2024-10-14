import React, { FC } from "react";
import styles from "./categoryProduct.module.scss";
import ProductCard from "@/component/productCard";
import { CategoryProductProps } from "./categoryProduct.types";

const CategoryProduct: FC<CategoryProductProps> = ({ product = [] }) => {
  return (
    <div className={styles.productWrapper}>
      {product.map((item) => {
        return (
            <ProductCard product={item}  key={item.id}/>
        );
      })}
    </div>
  );
};

export default CategoryProduct;
