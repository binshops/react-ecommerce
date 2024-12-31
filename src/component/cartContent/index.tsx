import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { useCart } from "@/context/cartContext";
import { useScrollLock } from "@/utils/hooks";

import Modal from "../modal";

import { CartContentProps } from "./cartContent.types";
import CartItem from "./cardItem";

import styles from "./cartContent.module.scss";

const CartContent: FC<CartContentProps> = ({ isOpen, setIsOpen }) => {
  const { cart } = useCart();
  const { unlockScroll } = useScrollLock();
  const { t } = useTranslation();

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
          {t("cart.total")}
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
