export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  disconnect: string;
  quantity: string;
  rate: number;
}

export interface ProductCarouselProps {
  product: Product[];
}

export interface ProductCardProps {
  product: Product;
}

export interface productInfo {
  id: string;
  title: string;
  price: string;
  options: ProductOptions[];
  description: string;
  setProduct: Function;
  productAttributeId: number;
}
export interface ProductOptions {
  id: number;
  title: string;
  type: string;
  items: {
    id: number;
    value: string;
    hex_value?: string;
  }[];
}

export interface productGalleryProps {
  images: { src: string }[];
}

export interface productDetailsProps {
  product: ProductType;
  setProduct: Function;
}

export interface ProductPageProps {
  data: ProductType;
}

export interface GroupAttributes {
  attributes: Record<string, { name: string; html_color_code?: string }>;
}
export interface Group {
  attributes: GroupAttributes["attributes"];
  group_name: string;
  group_type: string;
}
export interface Groups {
  [key: string]: Group;
}

export interface ProductData {
  name: string;
  images: { src: string }[];
  default_image: { url: string };
  price: string;
  groups: Groups;
  options?: ProductOptions[]; // This should ideally be replaced with a more specific type
  description: string;
  id_product: string;
  id_product_attribute: number;
}

export interface ProductAPI {
  psdata: ProductData;
}

export interface ProductType {
  title: string;
  images: { src: string }[];
  price: string;
  options: ProductOptions[];
  description: string;
  id: string;
  productAttributeId: number;
}
