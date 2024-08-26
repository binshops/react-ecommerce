import { createContext, useContext, useState, useEffect } from "react";
import { MegaMenuAPI } from "@/const/endPoint";
import { getData } from "@/utils/fetchData";
import { MegaMenuTransformer } from "@/utils/transformer/megaMenu";
import { menuItems, MenuPageProps } from "@/utils/type";


const MegaMenuContext = createContext<MenuPageProps | undefined>(undefined);

export const useMegaMenu = () => useContext(MegaMenuContext);

export const MegaMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<menuItems[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(MegaMenuAPI);
      const transformedData = MegaMenuTransformer(data);
      setMenu(transformedData.menuItems || []); 
    };

    fetchData();
  }, []);

  return (
    <MegaMenuContext.Provider value={{ menu }}>
      {children}
    </MegaMenuContext.Provider>
  );
};
