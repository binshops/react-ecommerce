import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useMegaMenu } from "@/context/menuContext";

import styles from "./megaMenu.module.scss";

const MegaMenu: React.FC = () => {
  const megaMenuContext = useMegaMenu();
  const router = useRouter();

  const menu = megaMenuContext?.menu;
  const handelSubmenuClick = (url: string) => {
    router.push(url);
  };
  return (
    <div className={styles.megaMenu}>
      {menu?.map((item, idx) => (
        <Link href={item.link} className={styles.menuItem} key={idx} passHref>
          <p className={styles.megaMenuItem}>{item.label}</p>
          {Boolean(item.children.length) && (
            <div className={styles.subMenu}>
              <div className={`${styles.linkBox} container`}>
                {item.children?.map((subLink, idx) => {
                  return (
                    <p
                      onClick={() => handelSubmenuClick(subLink.link)}
                      className={styles.link}
                      key={idx}
                    >
                      {subLink.title}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default MegaMenu;
