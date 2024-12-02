import { Filter } from "@/utils/type";
import { Value } from "sass";

export type FilterProps = {
  filters: Filter[];
  setFilterQuery: (value: string) => void;
  isOpenFilter: boolean;
  setIsOpenFilter: (Value: boolean) => void;
};
