import Link from "next/link";
import MainSlider from "@/component/mainSlider";
import HomeCategory from "@/component/homeCategory";
import ProductCarousel from "@/component/productCarousel";
import { getData } from "@/utils/fetchData";
import { HomePageAPI } from "@/const/endPoint";
import { HomeTransformer } from "@/utils/transformer/home";
import Subscribe from "@/component/subscribe";
import InstagramPost from "@/component/instagramPost";
import { Product } from "@/utils/type";

export default function Home({
  data,
  homeProductCarousel,
}: {
  data: any;
  homeProductCarousel: Product[];
}) {
  return (
    <>
      {console.log(data, homeProductCarousel)}
      <MainSlider />
      <HomeCategory />
      <ProductCarousel product={homeProductCarousel} />
      <Subscribe />
      <InstagramPost />
      <Link href={"/product"}> product </Link>
    </>
  );
}

export async function getServerSideProps() {
  const data = await getData(HomePageAPI);
  const { homeProductCarousel } = HomeTransformer(data);
  return { props: { data, homeProductCarousel } };
}