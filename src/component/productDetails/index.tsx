import React, { FC, useEffect, useState } from "react";

import { FeaturedProductAPI } from "@/const/endPoint";

import { FeaturedProductTransformer } from "@/utils/api/transformer/featuredProduct";
import { Product } from "@/utils/type";
import { getData } from "@/utils/api/fetchData/apiCall";

import ProductCarousel from "../productCarousel";
import ProductInfo from "../productInfo";
import ProductGallery from "../productGallery";

import { productDetailsProps } from "./productDetails.types";

import styles from "./productDetails.module.scss";

const ProductDetails: FC<productDetailsProps> = ({ product }) => {
  const [featuredProduct, setFeaturedProduct] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getData(FeaturedProductAPI);
        const transformedData = FeaturedProductTransformer(productData);
        setFeaturedProduct(transformedData);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
    product.id && fetchData();
  }, []);
  return (
    <div className={styles.productInfo}>
      <div className={styles.galleryContainer}>
        <ProductGallery images={product.images} />
      </div>
      <div className={styles.infoContainer}>
        <ProductInfo
          id={product.id}
          title={product.title}
          price={product.price}
          options={product.options}
          description={product.description}
          productAttributeId={product.productAttributeId}
        />
      </div>
      <div className={styles.carouselContainer}>
        <ProductCarousel product={featuredProduct} />
      </div>
    </div>
  );
};

export default ProductDetails;
