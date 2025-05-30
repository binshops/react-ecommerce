import { CategoryAPI, MegaMenuAPI } from "@/const/endPoint";
import { getData } from "@/utils/api/fetchData/apiCall";
import { GetServerSidePropsContext } from "next";
import React, { FC, useState } from "react";
import styles from "./styles.module.scss";
import CategoryProduct from "@/component/category/categoryProduct";
import CategoryOptions from "@/component/category/categoryOptions";
import AccordionItem from "@/component/accordionItem";
import { Category, CategoryPageProps } from "@/utils/type";
import Pagination from "@/component/pagination";
import { useRouter } from "next/router";
import Placeholder from "@/component/category/placeholder";
import { CategoryTransformer } from "@/utils/api/transformer/category";
import { useMegaMenu } from "@/context/menuContext";
import { useQuery } from "@tanstack/react-query";
import MetaTags from "@/component/metaTags";
import { MegaMenuTransformer } from "@/utils/api/transformer/megaMenu";

const fetchCategoryData = async (
  categoryId: string,
  page: number,
  filterQuery?: string,
  orderQuery?: string
) => {
  const categoryData = await getData(CategoryAPI, {
    id_category: categoryId,
    page,
    q: filterQuery,
    order: orderQuery,
  });
  return CategoryTransformer(categoryData);
};

const CategoryPage: FC<CategoryPageProps> = ({ initialCategory }) => {
  const [filterQuery, setFilterQuery] = useState<string | undefined>();
  const [orderQuery, setOrderQuery] = useState<string | undefined>();
  const router = useRouter();
  const menu = useMegaMenu();
  const page = parseInt(router.query.page as string, 10) || 0;
  const categoryId = String(router.query.slug);
  const { data: category, isLoading } = useQuery<Category>({
    queryKey: ["categoryData", categoryId, page, filterQuery, orderQuery],
    queryFn: () => fetchCategoryData(categoryId, page, filterQuery, orderQuery),
    initialData: initialCategory || undefined,
    enabled: !initialCategory,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Placeholder />;
  }

  return (
    <>
      <MetaTags title={category?.title} />

      <div className={styles.wrapper}>
        <div className={styles.categoryWrapper}>
          <div className={styles.title}>
            <p>Categories</p>
          </div>
          {menu?.map((item) => (
            <AccordionItem
              title={item.label}
              links={item.children}
              titleLink={item.link}
              mode="dark"
              key={item.id}
            />
          ))}
        </div>
        {category && (
          <div className={styles.productWrapper}>
            <CategoryOptions
              filters={category.filters}
              sortOptions={category.sortOptions}
              count={category.totalProducts}
              setFilterQuery={setFilterQuery}
              setOrderQuery={setOrderQuery}
            />
            <CategoryProduct product={category.product} />
            <Pagination totalPages={category.totalPage} />
          </div>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const categoryId = context.query.slug;
  const page = context.query.page;
  const referer = context.req.headers.referer || null;
  if (!referer) {
    const categoryData = await getData(CategoryAPI, {
      id_category: categoryId,
      page,
    });
    const data = CategoryTransformer(categoryData);
    const megaMenuData = await getData(MegaMenuAPI);
    const menu = MegaMenuTransformer(megaMenuData).menuItems;
    return {
      props: { initialCategory: data, menu },
    };
  }

  return { props: { initialCategory: null, categoryId } };
}

export default CategoryPage;
