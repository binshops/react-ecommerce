import { Category, CategoryFilter, CategoryProducts, CategorySort } from "../type/category";

export const productTransformer = (data: CategoryProducts[]) => {
  const product = data.map((product) => {
    return {
      id: product.id_product,
      name: product.name,
      price: product.price,
      image: product.cover.url,
      disconnect: product.discount_amount,
      quantity: product.quantity,
      rate: product.rate,
    };
  });
  return product;
};

export const sortTransformer = (data: CategorySort[]) => {
  const sortOptions = data.map((item: any) => {
    return {
      label: item.label,
      querySort: item.urlParameter,
      isActive: item.current,
    };
  });
  return sortOptions;
};

export const filtersTransformer = (data: CategoryFilter[]) => {
  const filterOptions = data.map((item) => {
    return {
      label: item.label,
      display: item.displayed,
      type: item.widgetType,
      options: item.filters.map((item) => {
        return {
          label: item.label,
          active: item.active,
          display: item.displayed,
          productCount: item.magnitude,
          filterQuery: item.nextEncodedFacets,
        };
      }),
    };
  });
  return filterOptions;
};


export const CategoryTransformer = (data: Category) => {
  return {
    title: data.psdata.name,
    product: productTransformer(data.psdata.products),
    filters: filtersTransformer(data.psdata.facets),
    sortOptions: sortTransformer(data.psdata.sort_orders),
    activeSort: data.psdata.sort_selected,
  };
};
