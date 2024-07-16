import React, { FC, useEffect, useState } from "react";
import styles from "./productInfo.module.scss";
import { productInfo } from "@/utils/type";
import Price from "../product/price";
import Options from "../product/options";
import { getData } from "@/utils/fetchData";
import { AddToCardAPI, ProductDetailAPI } from "@/const/endPoint";
import { ProductTransformer } from "@/utils/transformer/product";
import AddToCart from "../product/addToCart";
import { useCart } from "@/context/cartContext";

const ProductInfo: FC<productInfo> = ({
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
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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
      id: id,
      update: 1,
      productAttributeId: productAttributeId,
      quantity: quantity,
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
      />
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className={styles.description}
      />
    </div>
  );
};

export default ProductInfo;
