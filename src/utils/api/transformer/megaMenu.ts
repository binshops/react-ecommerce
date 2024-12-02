import { MegaMenuAPI } from "@/utils/type";

export const MegaMenuTransformer = (data: MegaMenuAPI) => {
  const menuItems = data.psdata.menuItems.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      label: item.label,
      link: "/category/" + item.id,
      children: item.children?.map((child) => {
        return {
          id: item.id,
          slug: child.slug,
          title: child.label,
          link: "/category/" + child.id,
        };
      }),
    };
  });
  return {
    menuItems,
  };
};
