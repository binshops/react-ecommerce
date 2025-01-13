import { ProductDetailAPI } from "@/const/endPoint";
import { getData } from "@/utils/api/fetchData/apiCall";
import { GetServerSidePropsContext } from "next";
import React, { FC, useEffect, useState } from "react";
import ProductDetails from "@/component/productDetails";
import { ProductPageProps, ProductType } from "@/utils/type";
import { ProductTransformer } from "@/utils/api/transformer/product";
import { useRouter } from "next/router";

const ProductPage: FC<ProductPageProps> = ({ initialProduct, productId }) => {
  const [product, setProduct] = useState<ProductType | null>(initialProduct);
  const [isLoading, setIsLoading] = useState(!initialProduct);
  const router = useRouter();

  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoading(true);
      try {
        const productData =
          productId &&
          (await getData(ProductDetailAPI, { product_id: productId }));
        setProduct(ProductTransformer(productData));
      } catch (error) {
        console.error("Failed to fetch category data:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialProduct) {
      fetchCategoryData();
    }
  }, [productId, router.locale, initialProduct]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {product && <ProductDetails product={product} setProduct={setProduct} />}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale = context.locale;
  const productId = context.query.slug;
  const referer = context.req.headers.referer || null;
  if (!referer) {
    const productData =
      productId &&
      (await getData(
        ProductDetailAPI,
        { product_id: productId },
        "",
        "",
        locale
      ));
    const data = ProductTransformer(productData);

    return { props: { initialProduct: data, productId } };
  }
  return { props: { initialProduct: null, productId } };
}

export default ProductPage;
