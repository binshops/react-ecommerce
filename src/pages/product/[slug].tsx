import ProductGallery from "@/component/productGallery";
import { ProductDetailAPI } from "@/const/endPoint";
import { getData } from "@/utils/fetchData";
import { GetServerSidePropsContext } from "next";
import React, { FC } from "react";
import ProductDetails from "@/component/productDetails";
import { ProductTransformer } from "@/utils/transformer/product";
import { ProductPageProps } from "@/utils/type";

const ProductPage: FC<ProductPageProps> = ({ product }) => {
  console.log("product", product);
  return (
    <div>
      <ProductDetails
        title={product.title}
        images={product.images}
        options={product.options}
        price={product.price}
        description={product.description}
      />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const productId = context.query.slug;

  const productData =
    productId && (await getData(ProductDetailAPI, { product_id: productId }));
  const product = ProductTransformer(productData);
  return { props: { product } };
}

export default ProductPage;
