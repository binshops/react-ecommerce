import React, { FC } from "react";
import styles from "./footer.module.scss";
import AccordionItem from "../accordionItem";
import { footerLink } from "@/const/FooterLink";
import useWindowSize from "@/utils/hooks/useWindowSize";
import { useRouter } from "next/router";

const Footer: FC = () => {
  const { width } = useWindowSize();
  const router = useRouter();

  return (
    <div className={styles.footer}>
      {width < 768 ? (
        footerLink.map((item) => {
          return (
            <AccordionItem
              titleLink={item.footerLink}
              title={item.footerTitle}
              links={item.link}
              key={item.id}
            />
          );
        })
      ) : (
        <>
          <div className={styles.columnWrapper}>
            {footerLink.map((item) => {
              return (
                <div
                  className={styles.column}
                  onClick={() => router.push(item.footerLink)}
                  key={item.id}
                >
                  <div className={styles.titleRow}>
                    <p className={styles.title}>{item.footerTitle}</p>
                  </div>
                  <div className={styles.linkBox}>
                    {item.link?.map((link, idx) => {
                      return (
                        <a
                          href={link.link}
                          key={idx}
                          className={styles.subLink}
                        >
                          {link.title}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.socialBox}>
            <p className={styles.title}>SOCIAL</p>
            <div className={styles.items}>
              <a href="https://www.google.com/" className={styles.link}>
                <img src="/images/icon/faceBook.png" alt="faceBook" />
              </a>
              <a href="https://www.google.com/" className={styles.link}>
                <img src="/images/icon/pinterest.png" alt="pinterest" />
              </a>
              <a href="https://www.google.com/" className={styles.link}>
                <img src="/images/icon/twitter.png" alt="twitter" />
              </a>
              <a href="https://www.google.com/" className={styles.link}>
                <img src="/images/icon/youtube.png" alt="youtube" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Footer;
