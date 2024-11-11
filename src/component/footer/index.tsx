import React, { FC } from "react";
import styles from "./footer.module.scss";
import AccordionItem from "../accordionItem";
import { footerLink } from "@/const/FooterLink";
import useWindowSize from "@/utils/hooks/useWindowSize";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faPinterest,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

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
              <a href="https://www.facebook.com/" className={styles.link} target="_blank">
                <FontAwesomeIcon
                  icon={faFacebook}
                  color="#192bc6"
                  fontSize={20}
                />
              </a>
              <a href="https://www.pinterest.com/" className={styles.link} target="_blank">
                <FontAwesomeIcon
                  icon={faPinterest}
                  color="#ac2e33"
                  fontSize={20}
                />
              </a>
              <a href="https://www.twitter.com/" className={styles.link} target="_blank">
                <FontAwesomeIcon
                  icon={faTwitter}
                  color="#1ea1f1"
                  fontSize={20}
                />
              </a>
              <a href="https://youtube.com/" className={styles.link} target="_blank">
                <FontAwesomeIcon
                  icon={faYoutube}
                  color="#b13733"
                  fontSize={20}
                />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Footer;
