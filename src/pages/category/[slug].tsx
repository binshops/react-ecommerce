import { CategoryAPI } from "@/const/endPoint";
import { getData } from "@/utils/api/fetchData/apiCall";
import { GetServerSidePropsContext } from "next";
import React, { FC, useEffect, useState } from "react";
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

const CategoryPage: FC<CategoryPageProps> = ({
  initialCategory,
  categoryId,
}) => {
  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [isLoading, setIsLoading] = useState(!initialCategory);
  const router = useRouter();
  const page = parseInt(router.query.page as string, 10);
  const menu = useMegaMenu();

  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoading(true);
      try {
        const categoryData = await getData(CategoryAPI, {
          id_category: categoryId,
          page: page,
        });
        setCategory(CategoryTransformer(categoryData));
      } catch (error) {
        console.error("Failed to fetch category data:", error);
        setCategory(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialCategory) {
      fetchCategoryData();
    }
  }, [categoryId, page, router.locale, initialCategory]);
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
          <CategoryOptions
            filters={category.filters}
            sortOptions={category.sortOptions}
            count={category.totalProducts}
            setCategory={setCategory}
            setIsLoading={setIsLoading}
            categoryId={categoryId}
            activeSort={category.activeSort}
            activeFilter={category.activeFilter}
          />
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
