import { Filter, Sort } from "@/utils/type";

export type CategoryOptionsProps = {
  filters: Filter[];
  sortOptions: Sort[];
  count: number;
  setCategory: (value: any) => void;
  categoryId: string;
  setIsLoading: (value: boolean) => void;
  activeSort: string;
  activeFilter: string;
};
