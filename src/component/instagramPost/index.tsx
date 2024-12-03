import React, { FC } from "react";

import useWindowSize from "@/utils/hooks/useWindowSize";
import { desktopPost, mobilePost } from "@/const/instagramImage";

import styles from "./instagramPost.module.scss";

const InstagramPost: FC = () => {
  const { width } = useWindowSize();

  return (
    <div className={styles.instagramPost}>
      <p className={styles.title}>Share Your Look </p>
      <p className={styles.description}>#YOURLOOK </p>
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
