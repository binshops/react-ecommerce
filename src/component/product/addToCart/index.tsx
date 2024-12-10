import React, { FC } from "react";

import { AddToCartProps } from "./addToCart.types";

import styles from "./addToCart.module.scss";

const AddToCart: FC<AddToCartProps> = ({
  quantity,
  setQuantity,
  handleAdd,
  isLoading,
}) => {
  return (
    <div className={styles.addToCart}>
      <div className={styles.quantityBox}>
        <button
          className={`${styles.minus} ${styles.disable}`}
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 0}
        ></button>
        <input
          type="text"
          className={styles.quantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button
          className={styles.plus}
          onClick={() => setQuantity(quantity + 1)}
        ></button>
      </div>
      <button
        className={`${styles.addToCartButton} ${
          isLoading ? styles.disable : ""
        }`}
        onClick={() => handleAdd()}
        disabled={isLoading}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default AddToCart;
