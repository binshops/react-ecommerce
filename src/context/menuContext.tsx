import React, { createContext, useContext, useState, useEffect } from "react";
import { getData } from "@/utils/api/fetchData/apiCall";
import { MegaMenuAPI } from "@/const/endPoint";
import { MegaMenuTransformer } from "@/utils/api/transformer/megaMenu";
import { menuItems } from "@/utils/type";

type MegaMenuContextType = menuItems[] | null;

const MegaMenuContext = createContext<MegaMenuContextType>(null);

export const MegaMenuProvider: React.FC<{
  children: React.ReactNode;
  initialMenu: menuItems[];
}> = ({ children, initialMenu }) => {
  const [menu, setMenu] = useState<menuItems[]>(initialMenu);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!initialMenu) {
        const megaMenuData = await getData(MegaMenuAPI);
        const transformedMenu = MegaMenuTransformer(megaMenuData).menuItems;
        setMenu(transformedMenu);
      }
    };
    fetchMenu();
  }, [initialMenu]);

  return (
    <MegaMenuContext.Provider value={menu}>{children}</MegaMenuContext.Provider>
  );
};

export const useMegaMenu = () => useContext(MegaMenuContext);
