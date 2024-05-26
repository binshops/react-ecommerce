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