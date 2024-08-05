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
      name:string
      products: CategoryProducts[];
      sort_orders: CategorySort[];
      facets: CategoryFilter[];
      sort_selected: string;
    };
  }