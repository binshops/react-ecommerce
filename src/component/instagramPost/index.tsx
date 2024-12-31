import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import useWindowSize from "@/utils/hooks/useWindowSize";
import { desktopPost, mobilePost } from "@/const/instagramImage";

import styles from "./instagramPost.module.scss";

const InstagramPost: FC = () => {
  const { width } = useWindowSize();
  const { t } = useTranslation();

  return (
    <div className={styles.instagramPost}>
      <p className={styles.title}>{t("instagram.share")} </p>
      <p className={styles.description}>{t("instagram.title")}</p>
      {width < 768 ? (
        <div className={styles.postContent}>
          {mobilePost?.map((post, index) => {
            return (
              <a className={styles.item} href={post.link} key={index}>
                <img src={post.image} alt={post.title} />
              </a>
            );
          })}
        </div>
      ) : (
        <div className={styles.postDeskTopContent}>
          {Array.from({ length: 2 }).map((_, columnIndex) => (
            <div className={styles.column} key={columnIndex}>
              {desktopPost
                ?.slice(columnIndex * 2, columnIndex * 2 + 2)
                .map((post, index) => (
                  <a className={styles.item} key={index}>
                    <img src={post.image} alt={post.title} />
                  </a>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstagramPost;
