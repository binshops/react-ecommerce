import React, { FC } from "react";
import styles from "./instagramPost.module.scss";
import post1 from "./../../../public/images/instagramPost/Instagram Feed 1.jpg";
import post2 from "./../../../public/images/instagramPost/Instagram Feed 2.jpg";
import post3 from "./../../../public/images/instagramPost/Instagram Feed 3.jpg";
import post4 from "./../../../public/images/instagramPost/Instagram Feed 4.jpg";

import Image from "next/image";

const InstagramPost: FC = () => {
  return (
    <div className={styles.instagramPost}>
      <p className={styles.title}>Share Your Look </p>
      <p className={styles.description}>#YOURLOOK </p>
      <div className={styles.postContent}>
        <a className={styles.item}>
          <Image src={post1} alt="" />
        </a>
        <a className={styles.item}>
          <Image src={post2} alt="" />
        </a>
        <a className={styles.item}>
          <Image src={post3} alt="" />
        </a>
        <a className={styles.item}>
          <Image src={post4} alt="" />
        </a>
      </div>
    </div>
  );
};

export default InstagramPost;
