export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  disconnect: string;
  quantity: string;
  rate: string;
}

export interface ProductCarouselProps {
  product: Product[];
}

export interface ProductCardProps {
  product: Product;
}

export interface productInfo {
  title: string;
  price: string;
  options:ProductOptions[]
  description:string
}
export interface ProductOptions {
  id: number;
  title: string;
  items: {
    id: number;
    value: string;
    hex_value?:string
  }[];
}

export interface productGalleryProps {
  images: { src: string }[];
}

export interface productDetailsProps {
  title: string;
  images: { src: string }[];
  price:string
  options:ProductOptions[]
  description:string
}
export interface ProductAPI {
  psdata: {
    name: string;
    images: { src: string }[];
    options: {
      id: number;
      title: string;
      items: {
        id: number;
        value: string;
      }[];
    }[];
    description:string,
    price:string
  };
}

export interface ProductPageProps {
  product: {
    title: string;
    images: { src: string }[];
    price: string;
    options: ProductOptions[];
    description:string;
  };
}
