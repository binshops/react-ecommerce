import { Sort } from "@/utils/type";

export type SortProps = {
  sortOptions: Sort[];
  setOrderQuery: (value: string) => void;
  showSortOption: boolean;
  setShowSortOption: (value: boolean) => void;
};
