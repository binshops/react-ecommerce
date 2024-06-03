

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

