import React, { FC } from "react";
import styles from "./cartContent.module.scss";
import { useCart } from "@/context/cartContext";
import CartItem from "./cardItem";
import Modal from "../modal";
import { useScrollLock } from "@/utils/hooks";
import { CartContentProps } from "./cartContent.types";

const CartContent: FC<CartContentProps> = ({ isOpen, setIsOpen }) => {
  const { cart } = useCart();
  const { unlockScroll } = useScrollLock();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        unlockScroll();
      }}
      isFullScreen
    >
      <div className={styles.cart}>
        <p className={styles.title}>
          Total items:
          <span>{cart?.totalProduct}</span>
        </p>
        {cart?.products?.map((product, idx) => {
          return <CartItem product={product} key={idx} />;
        })}
      </div>
    </Modal>
  );
};

export default CartContent;
