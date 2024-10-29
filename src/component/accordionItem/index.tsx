import React, { FC, useState } from "react";
import styles from "./accordionItem.module.scss";
import { AccordionItemProps } from "./accordion.types";
import Link from "next/link";
import { useRouter } from "next/router";

const AccordionItem: FC<AccordionItemProps> = ({
  title,
  links,
  titleLink,
  setIsLoading,
  mode = "light",
}) => {
  const [isOpen, setIsOpen] = useState(Boolean);
  const router = useRouter();
  return (
    <div
      className={`${styles.accordionItem} ${
        mode === "dark" ? styles.darkMode : ""
      }`}
      onClick={() => {
        setIsLoading && setIsLoading(true);
        router.push(titleLink);
      }}
    >
      <div className={styles.titleRow}>
        <p className={styles.title}>{title}</p>
        {links.length > 0 && (
          <div
            className={styles.showMore}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <img
              src={
                mode === "light"
                  ? "/images/icon/arrow.png"
                  : "/images/icon/darkArrow.png"
              }
              alt="arrow"
            />
          </div>
        )}
      </div>
      <div className={`${styles.linkBox} ${isOpen ? styles.showLink : ""}`}>
        {links.map((link, idx) => {
          return (
            <Link href={link.link} key={idx} className={styles.subLink}>
              {link.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionItem;
