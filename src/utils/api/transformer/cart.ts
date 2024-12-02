export const productTransformer = (data: any[]) => {
  const product = data?.map((product) => {
    return {
      id: product.id_product,
      name: product.name,
      productAttributeId:Number(product.id_product_attribute),
      price: product.formatted_price,
      image: product.image_url,
      totalPrice:product.formatted_total,
      disconnect: product.discount_amount,
      quantity: product.quantity,
      rate: product.rate,
      attributes:product.attributes_array
    };
  });
  return product;
};


export const CartTransformer = (data: any) => {
  const card = {
    products:productTransformer(data.psdata?.products),
    totalProduct:data.psdata?.products_count,
    totalPrice:data.psdata?.totals.total.value
  }

  return card;
};
