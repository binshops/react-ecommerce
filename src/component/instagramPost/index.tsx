import React, { FC } from "react";
import styles from "./instagramPost.module.scss";
import useWindowSize from "@/utils/hooks/useWindowSize";

const InstagramPost: FC = () => {
  const { width } = useWindowSize();

  return (
    <div className={styles.instagramPost}>
      <p className={styles.title}>Share Your Look </p>
      <p className={styles.description}>#YOURLOOK </p>
      {width < 768 ? (
        <div className={styles.postContent}>
          <a className={styles.item}>
            <img src="/images/instagramPost/Instagram Feed 1.jpg" alt="post1" />
          </a>
          <a className={styles.item}>
            <img src="/images/instagramPost/Instagram Feed 2.jpg" alt="post2" />
          </a>
          <a className={styles.item}>
            <img src="/images/instagramPost/Instagram Feed 3.jpg" alt="post3" />
          </a>
          <a className={styles.item}>
            <img src="/images/instagramPost/Instagram Feed 4.jpg" alt="post4" />
          </a>
        </div>
      ) : (
        <div className={styles.postDeskTopContent}>
          <div className={styles.column}>
            <a className={styles.item}>
              <img src="/images/instagramPost/desktop1.png" alt="post1" />
            </a>
            <a className={styles.item}>
              <img src="/images/instagramPost/desktop2.png" alt="post2" />
            </a>
          </div>
          <div className={styles.column}>
            <a className={styles.item}>
              <img src="/images/instagramPost/desktop3.png" alt="post3" />
            </a>
            <a className={styles.item}>
              <img src="/images/instagramPost/desktop4.png" alt="post4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramPost;
