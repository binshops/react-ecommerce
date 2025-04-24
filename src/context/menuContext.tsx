import React, { createContext, useContext, useState, useEffect } from "react";
import { getData } from "@/utils/api/fetchData/apiCall";
import { MegaMenuAPI } from "@/const/endPoint";
import { MegaMenuTransformer } from "@/utils/api/transformer/megaMenu";
import { menuItems } from "@/utils/type";
import { useRouter } from "next/router";

type MegaMenuContextType = menuItems[] | undefined;

const MegaMenuContext = createContext<MegaMenuContextType>(undefined);

export const MegaMenuProvider: React.FC<{
  children: React.ReactNode;
  initialMenu: menuItems[];
  language?: string;
}> = ({ children, initialMenu }) => {
  const [clientMenu, setClientMenu] = useState(initialMenu);
  const router = useRouter();

  useEffect(() => {
    const fetchMenu = async () => {
      const megaMenuData = await getData(MegaMenuAPI);
      setClientMenu(MegaMenuTransformer(megaMenuData).menuItems);
    };

    fetchMenu();
  }, [router.locale]);

  return (
    <MegaMenuContext.Provider value={clientMenu}>
      {children}
    </MegaMenuContext.Provider>
  );
};

export const useMegaMenu = () => useContext(MegaMenuContext);
