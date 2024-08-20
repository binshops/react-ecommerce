import React from "react";
import styles from "./megaMenu.module.scss";
import Link from "next/link";
import { useMegaMenu } from "@/context/menuContext";
import Loading from "../loading";

const MegaMenu: React.FC = () => {
  const megaMenuContext = useMegaMenu();
  const menu = megaMenuContext?.menu;
  return (
    <div className={styles.megaMenu}>
      {menu && menu.length > 0 ? (
        menu.map((item, idx) => (
          <Link href={item.link} className={styles.menuItem} key={idx} passHref>
            <p className={styles.megaMenuItem}>{item.label}</p>
            {Boolean(item.children.length) && (
              <div className={styles.subMenu}>
                <div className={`${styles.linkBox} container`}>
                  {item.children?.map((subLink, idx) => {
                    return (
                      <Link
                        href={subLink.link}
                        className={styles.link}
                        key={idx}
                      >
                        {subLink.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </Link>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MegaMenu;
