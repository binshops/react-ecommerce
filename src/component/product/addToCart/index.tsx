import React, { FC, useState } from "react";
import styles from "./addToCart.module.scss";
import { getData } from "@/utils/fetchData";
import { AddToCardAPI } from "@/const/endPoint";

const AddToCart: FC = ({}) => {
  const [quantity, setQuantity] = useState(1);
  const handleAdd =  async () => {
    try {
      const productData = await getData(AddToCardAPI, {
      });
      console.log('productData',productData)
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };
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
