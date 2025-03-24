import React, { createContext, useContext, useEffect, useState } from "react";
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
  const [clientMenu, setClientMenu] = useState(initialMenu);

  useEffect(() => {
    const fetchMenu = async () => {
      const megaMenuData = await getData(MegaMenuAPI);
      setClientMenu(MegaMenuTransformer(megaMenuData).menuItems);
    };

    fetchMenu();
  }, [language]);

  return (
    <MegaMenuContext.Provider value={clientMenu}>
      {children}
    </MegaMenuContext.Provider>
  );
};

export const useMegaMenu = () => useContext(MegaMenuContext);
