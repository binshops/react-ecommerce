import React, { FC, useEffect, useState } from "react";

import { ProductTransformer } from "@/utils/api/transformer/product";
import { getData } from "@/utils/api/fetchData/apiCall";

import { ProductDetailAPI } from "@/const/endPoint";

import { useCart } from "@/context/cartContext";

import AddToCart from "../product/addToCart";
import Options from "../product/options";
import Price from "../product/price";

import { productInfoProps } from "./productInfo.types";

import styles from "./productInfo.module.scss";

const ProductInfo: FC<productInfoProps> = ({
  id,
  title,
  price,
  options,
  description,
  setProduct,
  productAttributeId,
}) => {
  const [selectedOption, setSelectedOption] = useState<
    { id: string; value: string }[]
  >([]);
  const { addToCart, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
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
  useEffect(() => {
    const fetchData = async () => {
      const resultString =
        "&" +
        selectedOption
          .map((item) => `group[${item.id}]=${item.value}`)
          .join("&");
      try {
        const productData = await getData(
          ProductDetailAPI,
          {
            product_id: id,
            refresh: true,
          },
          resultString
        );
        const transformedData = ProductTransformer(productData);
        setProduct(transformedData);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
    selectedOption.length > 0 && fetchData();
  }, [selectedOption]);
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
      <h2 className={styles.productTitle}>{title}</h2>
      <Price price={price} />
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
        dangerouslySetInnerHTML={{ __html: description }}
        className={styles.description}
      />
    </div>
  );
};

export default ProductInfo;
