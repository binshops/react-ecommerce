import { createContext, useContext, useState, useEffect } from "react";
import { menuItems, MenuPageProps } from "@/utils/type";

const MegaMenuContext = createContext<MenuPageProps | undefined>(undefined);

export const useMegaMenu = () => useContext(MegaMenuContext);

export const MegaMenuProvider: React.FC<{
  children: React.ReactNode;
  initialMenu: menuItems[];
}> = ({ children, initialMenu }) => {
  const [menu, setMenu] = useState<menuItems[]>(initialMenu);

  useEffect(() => {
    setMenu(initialMenu);
  }, [initialMenu]);

  return (
    <MegaMenuContext.Provider value={{ menu }}>
      {children}
    </MegaMenuContext.Provider>
  );
};
