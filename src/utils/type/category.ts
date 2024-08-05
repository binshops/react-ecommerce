import { menuItems } from "./megaMenu";
import { Product } from "./product";

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
  }[];
}
export interface Category {
  psdata: {
    name: string;
    products: CategoryProducts[];
    sort_orders: CategorySort[];
    facets: CategoryFilter[];
    sort_selected: string;
  };
}

export interface filterItem {
  label: string;
  active: boolean;
  display: boolean;
  productCount: string;
  filterQuery: string;
}
export interface Sort {
  label: string;
  querySort: string;
  isActive: boolean;
  setSortOption: Function;
}
export interface FilterProps {
  filters: {
    label: string;
    display: boolean;
    type: string;
    options: filterItem[];
  }[];
  setFilterQuery: Function;
  isOpenFilter: boolean;
  setIsOpenFilter: Function;
}
export interface Category {
  filters: FilterProps;
  sortOptions: Sort[];
  product: Product[];
  activeSort: string;
}

export interface CategoryPageProps {
  data: Category;
  categoryId: string;
  menu: menuItems[];
}
