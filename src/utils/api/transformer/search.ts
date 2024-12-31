import { SearchAPI } from "@/utils/type";

export const SearchTransformer = (data: SearchAPI) => {
  const searchProducts = data.psdata.products.map((product) => {
    return {
      id: product.id_product,
      name: product.name,
      price: product.price,
      image: product.cover.url,
      disconnect: product.discount_amount,
      quantity: product.quantity,
      rate: product.rate,
    };
  });

  return {
    searchProducts,
  };
};
