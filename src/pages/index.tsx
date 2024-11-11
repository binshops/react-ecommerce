import Link from "next/link";
import MainSlider from "@/component/mainSlider";
import HomeCategory from "@/component/homeCategory";
import ProductCarousel from "@/component/productCarousel";
import { getData } from "@/utils/fetchData";
import { HomePageAPI, MegaMenuAPI } from "@/const/endPoint";
import { HomeTransformer } from "@/utils/transformer/home";
import Subscribe from "@/component/subscribe";
import InstagramPost from "@/component/instagramPost";
import { HomeProps } from "@/utils/type";
import { MegaMenuTransformer } from "@/utils/transformer/megaMenu";
import { MegaMenuProvider } from "@/context/menuContext";

export default function Home({
  data,
  homeProductCarousel,
  menu,
}: HomeProps): JSX.Element {
  return (
    <>
      <MegaMenuProvider initialMenu={menu}>
        <MainSlider />
        <HomeCategory />
        <ProductCarousel product={homeProductCarousel} />
        <Subscribe />
        <InstagramPost />
      </MegaMenuProvider>
    </>
  );
}

export async function getServerSideProps() {
  const data = await getData(HomePageAPI);
  const { homeProductCarousel } = HomeTransformer(data);
  const menuData = await getData(MegaMenuAPI);
  const menu = MegaMenuTransformer(menuData).menuItems;
  return { props: { data, homeProductCarousel, menu } };
}
