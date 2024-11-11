import { Product } from "./product";
import { menuItems } from "./megaMenu";

export interface HomeAPI {
  psdata: {
    featuredProductsList: {
      id_product: string;
      name: string;
      price: string;
      cover: { url: string };
      discount_amount: string;
      quantity: string;
      rate: number;
    }[];
  };
}

export interface HomeProps {
  data: any;
  homeProductCarousel: Product[];
  menu: menuItems[];
}
