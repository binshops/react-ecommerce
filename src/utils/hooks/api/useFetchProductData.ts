import { useQuery } from "react-query";
import { getData } from "@/utils/api/fetchData/apiCall";
import { ProductTransformer } from "@/utils/api/transformer/product";
import { ProductDetailAPI } from "@/const/endPoint";
import { ProductType } from "@/utils/type";

const fetchProductData = async ({
  productId,
  selectedOption = [],
  locale = "en",
  refresh = false,
}: {
  productId: string;
  selectedOption?: { id: string; value: string }[];
  locale?: string;
  refresh?: boolean;
}): Promise<ProductType> => {
  const queryString =
    selectedOption.length > 0
      ? "&" +
        selectedOption
          .map((option) => `group[${option.id}]=${option.value}`)
          .join("&")
      : "";

  const productData = await getData(
    ProductDetailAPI,
    { product_id: productId, refresh },
    queryString,
    "",
    locale
  );

  return ProductTransformer(productData);
};

export const useFetchProductData = ({
  productId,
  selectedOption = [],
  locale = "en",
  refresh = false,
  initialProduct = undefined,
}: {
  productId: string;
  selectedOption?: { id: string; value: string }[];
  locale?: string;
  refresh?: boolean;
  initialProduct?: any;
}) => {
  return useQuery(
    ["productData", productId, selectedOption, locale],
    () =>
      fetchProductData({
        productId,
        selectedOption,
        locale,
        refresh,
      }),
    {
      initialData: initialProduct || undefined,
      enabled: !initialProduct,
      refetchOnMount: false,
    }
  );
};
