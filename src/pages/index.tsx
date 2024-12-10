import MainSlider from "@/component/mainSlider";
import HomeCategory from "@/component/homeCategory";
import ProductCarousel from "@/component/productCarousel";
import { HomePageAPI, MegaMenuAPI } from "@/const/endPoint";
import Subscribe from "@/component/subscribe";
import InstagramPost from "@/component/instagramPost";
import { HomeProps } from "@/utils/type";
import { MegaMenuProvider } from "@/context/menuContext";
import { MegaMenuTransformer } from "@/utils/api/transformer/megaMenu";
import { HomeTransformer } from "@/utils/api/transformer/home";
import { getData } from "@/utils/api/fetchData/apiCall";

export default function Home({
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
