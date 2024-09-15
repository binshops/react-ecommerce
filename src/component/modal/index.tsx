import React, { FC } from "react";
import styles from "./modal.module.scss";
import { ModalProps } from "./modal.types";

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  width,
  height,
  isFullScreen,
  children,
}) => {
  const modalStyle = isFullScreen ? {} : { width, height };

  return (
    <div
      className={`${styles.modalWrapper} ${
        isFullScreen ? styles.isFullScreen : styles.modalBox
      } ${isOpen ? styles.open : styles.close}`}
      style={modalStyle}
    >
      <div className={styles.close} onClick={() => onClose()}>
        <img src="/images/icon/close.png" alt="close" />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
