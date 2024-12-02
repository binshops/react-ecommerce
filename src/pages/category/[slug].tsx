import { CategoryAPI, MegaMenuAPI, ProductDetailAPI } from "@/const/endPoint";
import { getData } from "@/utils/api/fetchData/apiCall";
import { GetServerSidePropsContext } from "next";
import React, { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import CategoryProduct from "@/component/category/categoryProduct";
import CategoryOptions from "@/component/category/categoryOptions";
import AccordionItem from "@/component/accordionItem";
import { Category, CategoryPageProps } from "@/utils/type/category";
import Pagination from "@/component/pagination";
import { useRouter } from "next/router";
import Placeholder from "@/component/category/placeholder";
import { CategoryTransformer } from "@/utils/api/transformer/category";
import { MegaMenuTransformer } from "@/utils/api/transformer/megaMenu";

const CategoryPage: FC<CategoryPageProps> = ({ data, categoryId, menu }) => {
  const [category, setCategory] = useState<Category | undefined>(data);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const page = parseInt(router.query.page as string, 10);
  useEffect(() => {
    setCategory(category);
  }, [category, isLoading]);
  useEffect(() => {
    setCategory(undefined);
  }, [router.asPath]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getData(CategoryAPI, {
          id_category: categoryId,
          page: page,
        });
        const transformedData = CategoryTransformer(categoryData);
        setCategory(transformedData);

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
    fetchData();
  }, [page, categoryId]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryWrapper}>
        <div className={styles.title}>
          <p>Categories</p>
        </div>
        {menu?.map((item) => {
          return (
            <AccordionItem
              title={item.label}
              links={item.children}
              titleLink={item.link}
              mode="dark"
              setIsLoading={setIsLoading}
              key={item.id}
            />
          );
        })}
      </div>
      {category ? (
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
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const categoryId = context.query.slug;
  const page = context.query.page;
  const categoryData = await getData(CategoryAPI, {
    id_category: categoryId,
    page: page,
  });
  const data = CategoryTransformer(categoryData);
  const megaMenu = await getData(MegaMenuAPI);
  const menu = MegaMenuTransformer(megaMenu).menuItems;
  return { props: { data, categoryId, menu } };
}

export default CategoryPage;
