import React, { FC, useState } from "react";
import styles from "./accordionItem.module.scss";
import { AccordionItemProps } from "./accordion.types";
import { useRouter } from "next/router";

const AccordionItem: FC<AccordionItemProps> = ({
  title,
  links,
  titleLink,
  mode = "light",
}) => {
  const [isOpen, setIsOpen] = useState(Boolean);
  const router = useRouter();
  return (
    <div
      className={`${styles.accordionItem} ${
        mode === "dark" ? styles.darkMode : ""
      }`}
      onClick={() =>
        links.length === 0 ? router.push(titleLink) : setIsOpen(!isOpen)
      }
    >
      <div className={styles.titleRow}>
        <p className={styles.title}>{title}</p>
        {links.length > 0 && (
          <img
            src={
              mode === "light"
                ? "/images/icon/arrow.png"
                : "/images/icon/darkArrow.png"
            }
            alt="arrow"
          />
        )}
      </div>
      <div className={`${styles.linkBox} ${isOpen ? styles.showLink : ""}`}>
        {links.map((link, idx) => {
          return (
            <a href={link.link} key={idx} className={styles.subLink}>
              {link.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionItem;
