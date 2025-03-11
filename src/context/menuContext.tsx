import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { getData } from "@/utils/api/fetchData/apiCall";
import { MegaMenuAPI } from "@/const/endPoint";
import { MegaMenuTransformer } from "@/utils/api/transformer/megaMenu";
import { menuItems } from "@/utils/type";

type MegaMenuContextType = menuItems[] | undefined;

const MegaMenuContext = createContext<MegaMenuContextType>(undefined);

export const MegaMenuProvider: React.FC<{
  children: React.ReactNode;
  initialMenu: menuItems[];
  language?: string;
}> = ({ children, initialMenu, language = "en" }) => {
  const { data: menu } = useQuery({
    queryKey: ["megaMenu", language],
    queryFn: async () => {
      const megaMenuData = await getData(MegaMenuAPI);
      return MegaMenuTransformer(megaMenuData).menuItems;
    },
    initialData: initialMenu,
  });

  return (
    <MegaMenuContext.Provider value={menu}>{children}</MegaMenuContext.Provider>
  );
};

export const useMegaMenu = () => useContext(MegaMenuContext);
