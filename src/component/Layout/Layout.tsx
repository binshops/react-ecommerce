import { ReactNode } from "react";
import { GetServerSidePropsContext } from "next";
import { getData } from "@/utils/api/fetchData/apiCall";
import { MegaMenuAPI } from "@/const/endPoint";
import { MegaMenuTransformer } from "@/utils/api/transformer/megaMenu";
import { menuItems } from "@/utils/type";
import { MegaMenuProvider } from "@/context/menuContext";

interface LayoutProps {
  children: ReactNode;
  initialMenu: menuItems[];
}

export const Layout = ({ children, initialMenu }: LayoutProps) => {
  return (
    <MegaMenuProvider initialMenu={initialMenu}>{children}</MegaMenuProvider>
  );
};

export const getLayoutInitialProps = async (ctx: GetServerSidePropsContext) => {
  const menuData = await getData(MegaMenuAPI);
  const menuItems = MegaMenuTransformer(menuData).menuItems;
  return menuItems;
};
