import React, { FC } from "react";
import styles from "./footer.module.scss";
import AccordionItem from "../accordionItem";
import { footerLink } from "@/const/FooterLink";
import useWindowSize from "@/utils/hooks/useWindowSize";
import { useRouter } from "next/router";
import faceBook from "./../../../public/images/icon/faceBook.png";
import twitter from "./../../../public/images/icon/twitter.png";
import pinterest from "./../../../public/images/icon/pinterest.png";
import youtube from "./../../../public/images/icon/youtube.png";
import Image from "next/image";

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
                    {item.link?.map((link,idx) => {
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
                <Image src={faceBook} alt="faceBook" />
              </a>
              <a href="https://www.google.com/" className={styles.link}>
                <Image src={pinterest} alt="pinterest" />
              </a>
              <a href="https://www.google.com/" className={styles.link}>
                <Image src={twitter} alt="twitter" />
              </a>
              <a href="https://www.google.com/" className={styles.link}>
                <Image src={youtube} alt="youtube" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Footer;
