import React, { FC, useState } from "react";
import styles from "./navigationBar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useMegaMenu } from "@/context/menuContext";
import { useScrollLock } from "@/utils/hooks/useScrollLock";
import Modal from "../modal";
import AccordionItem from "../accordionItem";
import icon1 from "./../../../public/images/icon/home.png";
import icon2 from "./../../../public/images/icon/Menu.png";
import icon4 from "./../../../public/images/icon/cart.png";
const NavigationBar: FC = () => {
  const { lockScroll, unlockScroll } = useScrollLock();
  const [openMenu, setOpenMenu] = useState(false);
  const megaMenuContext = useMegaMenu();
  const menu = megaMenuContext?.menu;
  return (
    <>
      <div className={styles.navigationBar}>

        <Link className={`${styles.navigationItem}`} href={"/menu"}>
          <div>
            <Image src={icon2} alt="Menu" className={styles.image} />
          </div>
          <p>Menu</p>
        </Link>
        <Link className={`${styles.navigationItem}`} href={"/"}>
          <div>
            <Image src={icon1} alt="Home" className={styles.image} />
          </div>
          <p>Home</p>
        </Link>
        <div
          className={`${styles.navigationItem}`}
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(true);
            lockScroll();
          }}
        >
          <div className={styles.cartImage}>
            <Image src={icon4} alt="Card" className={styles.image} />
          </div>
          <p className={styles.cartItem}>Card</p>
        </div>
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
