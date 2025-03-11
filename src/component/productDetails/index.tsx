import React, { FC } from "react";
import { useQuery } from "react-query";

import { FeaturedProductAPI } from "@/const/endPoint";
import { FeaturedProductTransformer } from "@/utils/api/transformer/featuredProduct";
import { Product } from "@/utils/type";
import { getData } from "@/utils/api/fetchData/apiCall";

import ProductCarousel from "../productCarousel";
import ProductInfo from "../productInfo";
import ProductGallery from "../productGallery";

import { productDetailsProps } from "./productDetails.types";
import styles from "./productDetails.module.scss";
import { useRouter } from "next/router";

const ProductDetails: FC<productDetailsProps> = ({ product }) => {
  const router = useRouter();
  const locale = router.locale || "en";
  const { data: featuredProduct = [] } = useQuery({
    queryKey: ["featuredProduct", locale],
    queryFn: async () => {
      const productData = await getData(FeaturedProductAPI, {}, "", "", locale);
      return FeaturedProductTransformer(productData);
    },
    enabled: !!product.id,
  });

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
