import { Filter, Sort } from "@/utils/type";

export type CategoryOptionsProps = {
  filters: Filter[];
  sortOptions: Sort[];
  count: number;
  setFilterQuery: (value: string) => void;
  setOrderQuery: (value: string) => void;
};
