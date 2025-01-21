import { menuItems } from "./megaMenu";

export interface CategoryProducts {
  id_product: string;
  name: string;
  price: string;
  cover: {
    url: string;
  };
  discount_amount: number;
  quantity: number;
  rate: string;
}
export interface CategorySort {
  label: string;
  querySort: string;
  isActive: boolean;
}
export interface CategoryFilter {
  label: string;
  displayed: boolean;
  widgetType: string;
  filters: {
    label: string;
    active: boolean;
    displayed: boolean;
    magnitude: number;
    nextEncodedFacets: string;
    properties: { color: string };
  }[];
}
export interface CategoryAPI {
  psdata: {
    name: string;
    products: CategoryProducts[];
    sort_orders: CategorySort[];
    facets: CategoryFilter[];
    order_param: string;
    q_param: string;
    pagination: {
      pages_count: number;
      total_items: number;
    };
  };
}

export interface filterItem {
  label: string;
  active: boolean;
  display: boolean;
  productCount: number;
  filterQuery: string;
  properties: { color: string };
}
export interface Sort {
  label: string;
  querySort: string;
  isActive: boolean;
  setSortOption?: Function;
}
export interface Filter {
  label: string;
  display: boolean;
  type: string;
  options: filterItem[];
}
export interface Category {
  title: string;
  filters: Filter[];
  sortOptions: Sort[];
  product: any[];
  activeSort: string;
  activeFilter: string;
  totalPage: number;
  totalProducts: number;
}

export interface CategoryPageProps {
  initialCategory: Category;
  categoryId: string;
}
