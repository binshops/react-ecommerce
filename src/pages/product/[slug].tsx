import { MegaMenuAPI, ProductDetailAPI } from "@/const/endPoint";
import { getData } from "@/utils/api/fetchData/apiCall";
import { GetServerSidePropsContext } from "next";
import React, { FC } from "react";
import ProductDetails from "@/component/productDetails";
import { ProductPageProps, ProductType } from "@/utils/type";
import { ProductTransformer } from "@/utils/api/transformer/product";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { MegaMenuTransformer } from "@/utils/api/transformer/megaMenu";

const fetchProductData = async (productId: string, locale?: string) => {
  const productData = await getData(
    ProductDetailAPI,
    { product_id: productId },
    "",
    "",
    locale
  );
  return ProductTransformer(productData);
};

const ProductPage: FC<ProductPageProps> = ({ initialProduct, productId }) => {
  const router = useRouter();
  const locale = router.locale || "en";

  const { data: product, isLoading } = useQuery<ProductType>(
    ["productData", productId],
    () => fetchProductData(String(productId), locale),
    {
      initialData: initialProduct || undefined,
      enabled: !initialProduct,
      refetchOnMount: false,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{product && <ProductDetails product={product} />}</div>;
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
    const menuData = await getData(MegaMenuAPI);
    const menu = MegaMenuTransformer(menuData).menuItems;
    return { props: { initialProduct: data, productId, menu } };
  }
  return { props: { initialProduct: null, productId } };
}

export default ProductPage;
