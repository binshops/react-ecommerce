import React, { FC } from "react";
import styles from "./updateQuantity.module.scss";
import { useCart } from "@/context/cartContext";
import toast from "react-hot-toast";
import { UpdateQuantityProps } from "../../cartContent.types";

const UpdateQuantity: FC<UpdateQuantityProps> = ({
  id,
  quantity,
  productAttributeId,
}) => {
  const { updateQuantity } = useCart();
  const handleUpdateQuantity = async (action: "up" | "down") => {
    const item = {
      id: id,
      update: 1,
      productAttributeId: productAttributeId,
      quantity: action === "down" ? quantity - 1 : quantity + 1,
    };
    updateQuantity(item, action);
    toast.success("Successfully update cart");
  };
  return (
    <div className={styles.updateQuantity}>
      <div onClick={() => handleUpdateQuantity("down")}>-</div>
      <p>{quantity}</p>
      <div onClick={() => handleUpdateQuantity("up")}>+</div>
    </div>
  );
};

export default UpdateQuantity;
