import { ProductAPI } from "../type";

export const ProductTransformer = (data: ProductAPI) => {
  return {
    title: data.psdata.name,
    images: data.psdata.images,
    price:data.psdata.price,
    options:data.psdata.options,
    description:data.psdata.description
  };
};
