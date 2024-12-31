import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faPinterest,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { footerLink, socialMediaLinks } from "@/const/FooterLink";
import useWindowSize from "@/utils/hooks/useWindowSize";

import AccordionItem from "../accordionItem";

import styles from "./footer.module.scss";

const Footer: FC = () => {
  const { width } = useWindowSize();
  const router = useRouter();
  const { t } = useTranslation();

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
                          className={styles.subLink}
                          key={idx}
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
            <p className={styles.title}>{t("footer.social")}</p>
            <div className={styles.items}>
              <a
                href={socialMediaLinks.faceBook}
                className={styles.link}
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  color="#192bc6"
                  fontSize={20}
                />
              </a>
              <a
                href={socialMediaLinks.pinterest}
                className={styles.link}
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faPinterest}
                  color="#ac2e33"
                  fontSize={20}
                />
              </a>
              <a
                href={socialMediaLinks.twitter}
                className={styles.link}
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  color="#1ea1f1"
                  fontSize={20}
                />
              </a>
              <a
                href={socialMediaLinks.youtube}
                className={styles.link}
                target="_blank"
              >
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
