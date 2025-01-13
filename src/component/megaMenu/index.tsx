import React from "react";
import { useRouter } from "next/router";
import styles from "./megaMenu.module.scss";
import { useMegaMenu } from "@/context/menuContext";

const MegaMenu: React.FC = () => {
  const menu = useMegaMenu();
  const router = useRouter();

  const handleSubmenuClick = (url: string) => {
    router.push(url);
  };

  return (
    <div className={styles.megaMenu}>
      {menu?.map((item, idx) => (
        <div
          className={styles.menuItem}
          key={idx}
          onClick={() => handleSubmenuClick(item.link)}
        >
          <p className={styles.megaMenuItem}>{item.label}</p>
          {Boolean(item.children.length) && (
            <div className={styles.subMenu}>
              <div className={`${styles.linkBox} container`}>
                {item.children?.map((subLink, idx) => (
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmenuClick(subLink.link);
                    }}
                    className={styles.link}
                    key={idx}
                  >
                    {subLink.title}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MegaMenu;
