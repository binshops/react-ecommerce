import { CategoryAPI, MegaMenuAPI, ProductDetailAPI } from "@/const/endPoint";
import { getData } from "@/utils/fetchData";
import { GetServerSidePropsContext } from "next";
import React, { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { CategoryTransformer } from "@/utils/transformer/category";
import CategoryProduct from "@/component/category/categoryProduct";
import CategoryOptions from "@/component/category/categoryOptions";
import Loading from "@/component/loading";
import { MegaMenuTransformer } from "@/utils/transformer/megaMenu";
import AccordionItem from "@/component/accordionItem";
import { CategoryPageProps } from "@/utils/type/category";


const CategoryPage: FC<CategoryPageProps> = ({ data, categoryId, menu }) => {
  const [category, setCategory] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCategory(category);
  }, [category, isLoading]);

  return (
    <>
      {!isLoading ? (
        <div className={styles.wrapper}>
          <div className={styles.categoryWrapper}>
            <div className={styles.title}>
              <p>
              Categories
              </p>
            </div>
            {menu?.map((item) => {
              return (
                <AccordionItem
                  title={item.label}
                  links={item.children}
                  titleLink={item.link}
                  mode="dark"
                  key={item.id}
                />
              );
            })}
          </div>
          <div className={styles.productWrapper}>
            <CategoryOptions
              filters={category.filters}
              sortOptions={category.sortOptions}
              count={category.product.length}
              setCategory={setCategory}
              setIsLoading={setIsLoading}
              categoryId={categoryId}
              activeSort={category.activeSort}
              activeFilter={category.activeFilter}
            />
            <CategoryProduct product={category.product} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const categoryId = context.query.slug;
  const categoryData = await getData(CategoryAPI, {
    id_category: categoryId,
    page: 1,
  });
  const data = CategoryTransformer(categoryData);
  const category = await getData(MegaMenuAPI);
  const menu = MegaMenuTransformer(category).menuItems;
  return { props: { data, categoryId, menu } };
}

export default CategoryPage;
