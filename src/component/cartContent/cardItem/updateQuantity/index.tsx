import React, { FC } from "react";
import styles from "./updateQuantity.module.scss";
import { useCart } from "@/context/cartContext";
import { UpdateQuantityProps } from "../../cartContent.types";

const UpdateQuantity: FC<UpdateQuantityProps> = ({
  id,
  quantity,
  productAttributeId,
}) => {
  const { updateQuantity, isLoading } = useCart();
  const handleUpdateQuantity = async (action: "up" | "down") => {
    const item = {
      id: id,
      update: 1,
      productAttributeId: productAttributeId,
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
        disabled={quantity <= 1}
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
