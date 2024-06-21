import React, { FC } from "react";
import styles from "./footer.module.scss";
import FooterItem from "./footerItem";
import { footerLink } from "@/const/FooterLink";

const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      {footerLink.map((item) => {
        return (
          <FooterItem
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
