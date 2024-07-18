import React, { FC, useState } from "react";
import arrow from "./../../../public/images/icon/arrow.png";
import styles from "./accordionItem.module.scss";
import Image from "next/image";

const AccordionItem: FC<{
  title: string;
  links: { title: string; link: string }[];
}> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(Boolean);

  return (
    <div className={styles.accordionItem} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.titleRow}>
        <p className={styles.title}>{title}</p>
        <Image src={arrow} alt="arrow" />
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
