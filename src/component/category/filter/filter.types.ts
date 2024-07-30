interface filterItem {
  label: string;
  active: boolean;
  display: boolean;
  productCount: string;
  filterQuery: string;
}

interface FilterProps {
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

interface Filters {
  filter: filterItem;
  setFilterQuery: Function;
}
