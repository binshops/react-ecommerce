import React, { FC } from "react";
import { getData } from "@/utils/fetchData";
import { MegaMenuTransformer } from "@/utils/transformer/megaMenu";
import { MegaMenuAPI } from "@/const/endPoint";
import { MenuPageProps } from "@/utils/type";
import AccordionItem from "@/component/accordionItem";

const MenuPage: FC<MenuPageProps> = ({ menu }) => {
  return (
    <div>
      {menu?.map((item) => {
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

export async function getServerSideProps() {
  const data = await getData(MegaMenuAPI);
  const menu = MegaMenuTransformer(data).menuItems;
  return { props: { menu } };
}

export default MenuPage;
