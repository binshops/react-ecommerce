import React, { FC, useEffect, useState } from "react";
import styles from "./productInfo.module.scss";
import { productInfo } from "@/utils/type";
import Price from "../product/price";
import Options from "../product/options";
import { getData } from "@/utils/fetchData";
import { ProductDetailAPI } from "@/const/endPoint";
import { ProductTransformer } from "@/utils/transformer/product";
import AddToCart from "../product/addToCart";
import { useCart } from "@/context/cartContext";
import toast from "react-hot-toast";

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
  const { addToCart, cart } = useCart();
  const productInCart = cart?.products?.find(
    (product) =>
      product.productAttributeId ===
        (productAttributeId ? productAttributeId : 1) && product.id === id
  );
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
  useEffect(() => {
    setQuantity(productInCart ? productInCart.quantity : 1);
  }, [productInCart]);
  const handleAdd = async () => {
    const item = {
      id: id,
      update: 1,
      productAttributeId: productAttributeId,
      quantity: quantity,
    };
    addToCart(item);
    toast.success("Successfully add to cart");
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
