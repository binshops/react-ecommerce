export interface MegaMenuAPI {
  psdata: {
    menuItems: {
      id: string;
      slug: string;
      label: string;
      page_identifier: string;
      children: {
        id: string;
        slug: string;
        label: string;
        page_identifier: string;
      }[];
    }[];
  };
}

export interface menuItem {
  id?: string;
  slug?: string;
  title: string;
  link: string;
}
export interface menuItems {
  id: string;
  slug: string;
  label: string;
  link: string;
  children: menuItem[];
}

export interface MenuPageProps{
  menu?:menuItems[]
}