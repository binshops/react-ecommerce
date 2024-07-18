import React, { FC } from "react";
import styles from "./footer.module.scss";
import AccordionItem from "../accordionItem";
import { footerLink } from "@/const/FooterLink";

const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      {footerLink.map((item) => {
        return (
          <AccordionItem
            titleLink={item.footerLink}
            title={item.footerTitle}
            links={item.link}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

export default Footer;
