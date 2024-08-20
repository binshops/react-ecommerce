import React, { FC, useState } from "react";
import styles from "./navigationBar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { navigationItems } from "@/const/navigationBar";
import { useMegaMenu } from "@/context/menuContext";
import { useScrollLock } from "@/utils/hooks/useScrollLock";
import Modal from "../modal";
import AccordionItem from "../accordionItem";

const NavigationBar: FC = () => {
  const { lockScroll, unlockScroll } = useScrollLock();
  const [openMenu, setOpenMenu] = useState(false);
  const megaMenuContext = useMegaMenu();
  const menu = megaMenuContext?.menu;
  return (
    <>
    <div className={styles.navigationBar}>
      {navigationItems.map((item, idx) => {
        return (
          <Link
            className={`${styles.navigationItem}`}
            href={item.link}
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              setOpenMenu(true);
              lockScroll();
            }}
          >
            <div className={`${item.text === "Cart" ? styles.cartImage : ""}`}>
              <Image src={item.icon} alt={item.text} className={styles.image} />
            </div>
            <p className={`${item.text === "Cart" ? styles.cartItem : ""}`}>
              {item.text}
            </p>
          </Link>
        );
      })}
    
    </div>
    <Modal
        isOpen={openMenu}
        onClose={() => {
          setOpenMenu(false);
          unlockScroll();
        }}
        isFullScreen
      >
        <div>
          {menu?.map((item) => {
            return (
              <AccordionItem
                title={item.label}
                links={item.children}
                titleLink={item.link}
                mode="dark"
                key={item.id}
              />
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default NavigationBar;
