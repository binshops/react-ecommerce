import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { AccordionItemProps } from "./accordion.types";

import styles from "./accordionItem.module.scss";

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
      onClick={() => {
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
            <FontAwesomeIcon
              icon={faChevronRight}
              fontSize={16}
              color={mode === "light" ? "#fff" : "#000"}
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
