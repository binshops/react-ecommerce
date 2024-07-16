export interface FeaturedProductAPI {
  psdata: {
    id_product: string;
    name: string;
    price: string;
    cover: { url: string };
    discount_amount: string;
    quantity: string;
    rate: number;
  }[];
}
