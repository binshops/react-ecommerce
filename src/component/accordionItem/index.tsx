import React, { FC, useState } from "react";
import arrow from "./../../../public/images/icon/arrow.png";
import darkArrow from "./../../../public/images/icon/darkArrow.png";
import styles from "./accordionItem.module.scss";
import Image from "next/image";
import { AccordionItemProps } from "./accordion.types";

const AccordionItem: FC<AccordionItemProps> = ({
  title,
  links,
  mode = "light",
}) => {
  const [isOpen, setIsOpen] = useState(Boolean);
  return (
    <div
      className={`${styles.accordionItem} ${
        mode === "dark" ? styles.darkMode : ""
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.titleRow}>
        <p className={styles.title}>{title}</p>
        {links.length > 0 && (
          <Image src={mode === "light" ? arrow : darkArrow} alt="arrow" />
        )}
      </div>
      <div className={`${styles.linkBox} ${isOpen ? styles.showLink : ""}`}>
        {links.map((link) => {
          return (
            <a href={link.link} key={link.title} className={styles.subLink}>
              {link.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionItem;
