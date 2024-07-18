import React, { useEffect, useState } from "react";
import styles from "./megaMenu.module.scss";
import Link from "next/link";
import { getData } from "@/utils/fetchData";
import { MegaMenuAPI } from "@/const/endPoint";
import { MegaMenuTransformer } from "@/utils/transformer/megaMenu";
import { menuItems } from "@/utils/type";

const MegaMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<menuItems[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(MegaMenuAPI);
      const transformedData = MegaMenuTransformer(data);
      setMenuItems(transformedData.menuItems);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.megaMenu}>
      {menuItems?.map((item, idx) => (
        <Link href={item.link} className={styles.menuItem} key={idx} passHref>
          <p className={styles.megaMenuItem}>{item.label}</p>
          {Boolean(item.children.length) && (
            <div className={styles.subMenu}>
              <div className={`${styles.linkBox} container`}>
                {item.children?.map((subLink, idx) => {
                  return (
                    <Link href={item.link} className={styles.link} key={idx}>
                      {subLink.title}
                    </Link>
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
