import { MegaMenuAPI, ProductDetailAPI } from "@/const/endPoint";
import { getData } from "@/utils/api/fetchData/apiCall";
import { GetServerSidePropsContext } from "next";
import React, { FC } from "react";
import ProductDetails from "@/component/productDetails";
import { ProductPageProps, ProductType } from "@/utils/type";
import { ProductTransformer } from "@/utils/api/transformer/product";
import { useRouter } from "next/router";
import { MegaMenuTransformer } from "@/utils/api/transformer/megaMenu";
import ProductPlaceholder from "./placeholder";
import { useFetchProductData } from "@/utils/hooks/api/useFetchProductData";
import MetaTags from "@/component/metaTags";

const ProductPage: FC<ProductPageProps> = ({ initialProduct, productId }) => {
  const router = useRouter();
  const locale = router.locale || "en";

  const { data: product, isLoading } = useFetchProductData({
    productId,
    locale: locale,
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
  const locale = context.locale;
  const productId = context.query.slug;
  const referer = context.req.headers.referer || null;
  const menuData = await getData(MegaMenuAPI);
  const menu = MegaMenuTransformer(menuData).menuItems;
  if (!referer) {
    const productData =
      productId && (await getData(ProductDetailAPI, { product_id: productId }));
    const data = ProductTransformer(productData);
    return { props: { initialProduct: data, productId, menu } };
  }
  return { props: { initialProduct: null, productId, menu } };
}

export default ProductPage;
