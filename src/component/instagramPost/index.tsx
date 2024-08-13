import React, { FC } from "react";
import styles from "./instagramPost.module.scss";
import post1 from "./../../../public/images/instagramPost/Instagram Feed 1.jpg";
import post2 from "./../../../public/images/instagramPost/Instagram Feed 2.jpg";
import post3 from "./../../../public/images/instagramPost/Instagram Feed 3.jpg";
import post4 from "./../../../public/images/instagramPost/Instagram Feed 4.jpg";
import post1Desktop from "./../../../public/images/instagramPost/desktop1.png";
import post2Desktop from "./../../../public/images/instagramPost/desktop2.png";
import post3Desktop from "./../../../public/images/instagramPost/desktop3.png";
import post4Desktop from "./../../../public/images/instagramPost/desktop4.png";

import Image from "next/image";
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
            <Image src={post1} alt="post1" />
          </a>
          <a className={styles.item}>
            <Image src={post2} alt="post2" />
          </a>
          <a className={styles.item}>
            <Image src={post3} alt="post3" />
          </a>
          <a className={styles.item}>
            <Image src={post4} alt="post4" />
          </a>
        </div>
      ) : (
        <div className={styles.postDeskTopContent}>
          <div className={styles.column}>
            <a className={styles.item}>
              <Image src={post1Desktop} alt="post1" />
            </a>
            <a className={styles.item}>
              <Image src={post2Desktop} alt="post2" />
            </a>
          </div>
          <div className={styles.column}>
            <a className={styles.item}>
              <Image src={post3Desktop} alt="post3" />
            </a>
            <a className={styles.item}>
              <Image src={post4Desktop} alt="post4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramPost;
