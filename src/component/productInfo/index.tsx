import React, { FC, useState } from "react";
import { useQuery } from "react-query";

import { ProductTransformer } from "@/utils/api/transformer/product";
import { getData } from "@/utils/api/fetchData/apiCall";

import { ProductDetailAPI } from "@/const/endPoint";

import { useCart } from "@/context/cartContext";

import AddToCart from "../product/addToCart";
import Options from "../product/options";
import Price from "../product/price";

import { productInfoProps } from "./productInfo.types";

import styles from "./productInfo.module.scss";
import { useFetchProductData } from "@/utils/hooks/api/useFetchProductData";

const fetchProductData = async (
  productId: string,
  selectedOption: { id: string; value: string }[]
) => {
  const queryString =
    "&" +
    selectedOption
      .map((option) => `group[${option.id}]=${option.value}`)
      .join("&");
  const productData = await getData(
    ProductDetailAPI,
    { product_id: productId, refresh: true },
    queryString
  );
  return ProductTransformer(productData);
};

const ProductInfo: FC<productInfoProps> = ({
  id,
  title,
  price,
  options,
  description,
  productAttributeId,
}) => {
  const [selectedOption, setSelectedOption] = useState<
    { id: string; value: string }[]
  >([]);
  const { addToCart, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);

  const {
    data: productData,
    isFetching,
    isError,
  } = useFetchProductData({
    productId: id,
    selectedOption,
    refresh: true,
  });

  const handleSelectOption = (id: string, value: string) => {
    const index = selectedOption.findIndex((option) => option.id === id);
    if (index > -1) {
      const newOptions = [...selectedOption];
      newOptions[index].value = value;
      setSelectedOption(newOptions);
    } else {
      setSelectedOption([...selectedOption, { id, value }]);
    }
  };

  const handleAdd = async () => {
    const item = {
      id,
      update: 1,
      productAttributeId,
      quantity,
    };
    addToCart(item);
  };

  return (
    <div className={styles.productInfo}>
      <h2 className={styles.productTitle}>{productData?.title || title}</h2>
      <Price price={productData?.price || price} />
      {options && (
        <Options options={options} handleSelectOption={handleSelectOption} />
      )}
      <AddToCart
        quantity={quantity}
        setQuantity={setQuantity}
        handleAdd={handleAdd}
        isLoading={isLoading}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: productData?.description || description,
        }}
        className={styles.description}
      />
    </div>
  );
};

export default ProductInfo;
