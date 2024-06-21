import { ProductDetailAPI } from '@/const/endPoint';
import { getData } from '@/utils/fetchData';
import { GetServerSidePropsContext } from 'next';
import React from 'react';

const ProductDetail = ({ product }) => {

  return (
    <div>
      <h1>{product.psdata?.name}</h1>
    </div>
  );
};

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const productId = context.query.slug; 

  const product =productId&& await getData(ProductDetailAPI , {'product_id':productId});

  return { props: { product } };
}


export default ProductDetail;
