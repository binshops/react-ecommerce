import React, { FC } from "react";
import styles from "./categoryProduct.module.scss";
import Link from "next/link";
import ProductCard from "@/component/productCard";
import { CategoryProductProps } from "./categoryProduct.types";

const CategoryProduct: FC<CategoryProductProps> = ({ product = [] }) => {
  return (
    <div className={styles.productWrapper}>
      {product.map((item) => {
        return (
          <Link href={`/product/${item.id}`} key={item.id}>
            <ProductCard product={item} />
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryProduct;
