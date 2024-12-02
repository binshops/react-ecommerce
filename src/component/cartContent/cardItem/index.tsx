import React, { FC } from "react";

import { useCart } from "@/context/cartContext";

import UpdateQuantity from "./updateQuantity";
import { CartItemProps } from "./cardItem.types";

import styles from "./cardItem.module.scss";

const CartItem: FC<CartItemProps> = ({ product }) => {
  const { id, productAttributeId, quantity, name, image, price, attributes } =
    product;
  const { removeFromCart, isLoading } = useCart();
  const handleRemove = async () => {
    const item = {
      id,
      productAttributeId,
    };
    removeFromCart(item);
  };
  return (
    <div className={styles.cardItem}>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{name}</p>
        <div className={styles.priceBox}>
          <p className={styles.price}>{price}</p>
        </div>
        {Object.entries(attributes)?.map(([key, value], index) => (
          <div className={styles.attribute} key={index}>
            <span className={styles.attributeName}>{key}: </span>
            <span className={styles.attributeValue}>{value}</span>
          </div>
        ))}
        <UpdateQuantity
          id={id}
          productAttributeId={productAttributeId}
          quantity={quantity}
        />
        <button
          className={`${styles.removeItem} ${isLoading ? styles.disable : ""}`}
          disabled={isLoading}
          onClick={() => handleRemove()}
        >
          remove from cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
