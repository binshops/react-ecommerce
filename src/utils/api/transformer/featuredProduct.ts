import { FeaturedProductAPI } from "@/utils/type";

export const FeaturedProductTransformer = (data: FeaturedProductAPI) => {
  const productCarousel = data.psdata.map((product) => {
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
  return productCarousel;
};
