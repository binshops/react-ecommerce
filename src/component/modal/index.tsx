import React, { FC, useEffect, useRef } from "react";
import { useRouter } from "next/router";
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
  const divRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onClose();
  }, [router.asPath]);

  return (
    <div
      className={`${styles.modalWrapper} ${
        isFullScreen ? styles.isFullScreen : styles.modalBox
      } ${isOpen ? styles.open : styles.close}`}
      style={modalStyle}
      ref={divRef}
    >
      <div className={styles.close} onClick={() => onClose()}>
        <img src="/images/icon/close.png" alt="close" />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
