import { ProductDetailAPI } from "@/const/endPoint";
import { getData } from "@/utils/api/fetchData/apiCall";
import { GetServerSidePropsContext } from "next";
import React, { FC } from "react";
import ProductDetails from "@/component/productDetails";
import { ProductPageProps } from "@/utils/type";
import { ProductTransformer } from "@/utils/api/transformer/product";
import ProductPlaceholder from "./placeholder";
import { useFetchProductData } from "@/utils/hooks/api/useFetchProductData";
import MetaTags from "@/component/metaTags";
import { getLayoutInitialProps } from "@/component/Layout/layout";

const ProductPage: FC<ProductPageProps> = ({ initialProduct, productId }) => {
  const { data: product, isLoading } = useFetchProductData({
    productId,
    initialProduct,
  });

  if (isLoading) {
    return <ProductPlaceholder />;
  }

  return (
    <>
      <MetaTags title={product?.title} />
      {product && <ProductDetails product={product} />}
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const productId = context.query.slug;
  const referer = context.req.headers.referer || null;
  const initialMenu = await getLayoutInitialProps(context);

  if (!referer) {
    const productData =
      productId && (await getData(ProductDetailAPI, { product_id: productId }));
    const data = ProductTransformer(productData);
    return { props: { initialProduct: data, productId, initialMenu } };
  }
  return { props: { initialProduct: null, productId, initialMenu } };
}

export default ProductPage;
