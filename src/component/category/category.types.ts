import { Sort } from "@/utils/type";

export interface CategoryOptionsProps {
  filters: any;
  sortOptions: Sort[];
  count: number;
  setCategory: Function;
  categoryId: string;
  setIsLoading: Function;
  activeSort: string;
  activeFilter: string;
}

export interface SortProps {
  sortOptions: Sort[];
  setOrderQuery: Function;
  showSortOption: boolean;
  setShowSortOption: Function;
}
