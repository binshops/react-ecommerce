import React from "react";
import styles from "./megaMenu.module.scss";
import Link from "next/link";
import { useMegaMenu } from "@/context/menuContext";
import { useRouter } from "next/router";

const MegaMenu: React.FC = () => {
  const megaMenuContext = useMegaMenu();
  const menu = megaMenuContext?.menu;
  const router = useRouter();
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
