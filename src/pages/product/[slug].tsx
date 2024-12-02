import { MegaMenuAPI, ProductDetailAPI } from "@/const/endPoint";
import { getData } from "@/utils/api/fetchData/apiCall";
import { GetServerSidePropsContext } from "next";
import React, { FC, useEffect, useState } from "react";
import ProductDetails from "@/component/productDetails";
import { ProductPageProps } from "@/utils/type";
import { ProductTransformer } from "@/utils/api/transformer/product";
import { MegaMenuTransformer } from "@/utils/api/transformer/megaMenu";

const ProductPage: FC<ProductPageProps> = ({ data }) => {
  const [product, setProduct] = useState(data);
  useEffect(() => {
    setProduct(data);
  }, [data]);
  return (
    <div>
      {product && <ProductDetails product={product} setProduct={setProduct} />}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const productId = context.query.slug;

  const productData =
    productId && (await getData(ProductDetailAPI, { product_id: productId }));
  const data = ProductTransformer(productData);
  const megaMenu = await getData(MegaMenuAPI);
  const menu = MegaMenuTransformer(megaMenu).menuItems;
  return { props: { data, menu } };
}

export default ProductPage;
