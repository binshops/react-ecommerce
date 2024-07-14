import React, { FC } from "react";
import styles from "./productDetails.module.scss";
import ProductGallery from "../productGallery";
import ProductInfo from "../productInfo";
import { productDetailsProps } from "@/utils/type";

const ProductDetails: FC<productDetailsProps> = ({ product, setProduct }) => {
  return (
    <div className={styles.productInfo}>
      <ProductGallery images={product.images} />
      <ProductInfo
        id={product.id}
        title={product.title}
        price={product.price}
        options={product.options}
        description={product.description}
        setProduct={setProduct}
        productAttributeId={product.productAttributeId}
      />
    </div>
  );
};

export default ProductDetails;
