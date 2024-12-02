import React, { FC } from "react";

import { useCart } from "@/context/cartContext";

import { UpdateQuantityProps } from "./updateQuantity.types";

import styles from "./updateQuantity.module.scss";

const UpdateQuantity: FC<UpdateQuantityProps> = ({
  id,
  quantity,
  productAttributeId,
}) => {
  const { updateQuantity, isLoading } = useCart();
  const handleUpdateQuantity = async (action: "up" | "down") => {
    const item = {
      id,
      update: 1,
      productAttributeId,
      quantity: action === "down" ? quantity - 1 : quantity + 1,
    };
    !isLoading && updateQuantity(item, action);
  };
  return (
    <div
      className={`${styles.updateQuantity} ${isLoading ? styles.disable : ""}`}
    >
      <button
        className={styles.button}
        onClick={() => handleUpdateQuantity("down")}
        disabled={quantity === 1}
      >
        -
      </button>
      <p>{quantity}</p>
      <button
        className={styles.button}
        onClick={() => handleUpdateQuantity("up")}
      >
        +
      </button>
    </div>
  );
};

export default UpdateQuantity;
