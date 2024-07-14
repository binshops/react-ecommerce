import React, { FC } from "react";
import styles from "./addToCart.module.scss";
import { AddToCartProps } from "./addToCart.types";

const AddToCart: FC<AddToCartProps> = ({quantity,setQuantity,handleAdd}) => {
  return (
    <div className={styles.addToCart}>
      <div className={styles.quantityBox}>
        <button
          className={styles.minus}
          onClick={() => quantity > 0 && setQuantity(quantity - 1)}
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
      <button className={styles.addToCartButton} onClick={()=>handleAdd()}>Pick up in store</button>
    </div>
  );
};

export default AddToCart;
