import { CategoryAPI } from "@/const/endPoint";
import { getData } from "@/utils/api/fetchData/apiCall";
import { GetServerSidePropsContext } from "next";
import React, { FC } from "react";
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
import { useQuery } from "react-query";

const fetchCategoryData = async (
  categoryId: string,
  page: number,
  locale: string
) => {
  console.log("Fetching data for:", { categoryId, page, locale });
  const categoryData = await getData(
    CategoryAPI,
    { id_category: categoryId, page },
    "",
    "",
    locale
  );
  return CategoryTransformer(categoryData);
};

const CategoryPage: FC<CategoryPageProps> = ({ initialCategory }) => {
  const router = useRouter();
  const menu = useMegaMenu();
  const page = parseInt(router.query.page as string, 10) || 0;
  const categoryId = String(router.query.slug);

  const { data: category, isLoading } = useQuery<Category>(
    ["categoryData", categoryId, page, router.locale],
    () => fetchCategoryData(categoryId, page, router.locale!),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    }
  );

  if (isLoading) {
    return <Placeholder />;
  }

  return (
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
          {/* <CategoryOptions
            filters={category.filters}
            sortOptions={category.sortOptions}
            count={category.totalProducts}
            categoryId={categoryId}
            activeSort={category.activeSort}
            activeFilter={category.activeFilter}
          /> */}
          <CategoryProduct product={category.product} />
          <Pagination totalPages={category.totalPage} />
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale = context.locale;
  const categoryId = context.query.slug;
  const page = context.query.page;
  const referer = context.req.headers.referer || null;

  if (!referer) {
    const categoryData = await getData(
      CategoryAPI,
      { id_category: categoryId, page },
      "",
      "",
      locale
    );
    const data = CategoryTransformer(categoryData);

    return { props: { initialCategory: data, categoryId } };
  }

  return { props: { initialCategory: null, categoryId } };
}

export default CategoryPage;
