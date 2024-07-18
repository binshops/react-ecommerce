// pages/basket.tsx
import React, { useEffect, useState } from "react";
import { getData } from "@/utils/fetchData";
import { MegaMenuTransformer } from "@/utils/transformer/megaMenu";
import { MegaMenuAPI } from "@/const/endPoint";
import { menuItems } from "@/utils/type";
import AccordionItem from "@/component/accordionItem";

const MenuPage = () => {
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
    <div>
      {menuItems?.map((item) => {
        return (
          <AccordionItem
            title={item.label}
            links={item.children}
            titleLink={item.link}
            mode="dark"
            key={item.id}
          />
        );
      })}
    </div>
  );
};

export default MenuPage;
