import React, { FC, useEffect, useState } from "react";
import styles from "./productDetails.module.scss";
import ProductGallery from "../productGallery";
import ProductInfo from "../productInfo";
import { Product, productDetailsProps } from "@/utils/type";
import { getData } from "@/utils/fetchData";
import { FeaturedProductAPI } from "@/const/endPoint";
import { FeaturedProductTransformer } from "@/utils/transformer/featuredProduct";
import ProductCarousel from "../productCarousel";

const ProductDetails: FC<productDetailsProps> = ({ product, setProduct }) => {
  const [featuredProduct,setFeaturedProduct]=useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getData(
          FeaturedProductAPI
        );
        console.log('proooo',productData)
        const transformedData = FeaturedProductTransformer(productData);
        console.log('transformedData',transformedData)

        setFeaturedProduct(transformedData);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
    product.id&& fetchData();
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
        setProduct={setProduct}
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
