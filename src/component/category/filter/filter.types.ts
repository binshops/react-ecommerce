import { Filter } from "@/utils/type";

export type FilterProps = {
  filters: Filter[];
  setFilterQuery: Function;
  isOpenFilter: boolean;
  setIsOpenFilter: Function;
};
