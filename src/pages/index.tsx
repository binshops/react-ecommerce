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
import { useScrollRestoration } from "@/utils/hooks";

export default function Home({
  homeProductCarousel,
  menu,
}: HomeProps): JSX.Element {
  useScrollRestoration();
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

export async function getServerSideProps({ locale }: { locale: string }) {
  const data = await getData(HomePageAPI, {}, "", "", locale);
  const { homeProductCarousel } = HomeTransformer(data);
  const menuData = await getData(MegaMenuAPI, {}, "", "", locale);
  const menu = MegaMenuTransformer(menuData).menuItems;
  return { props: { data, homeProductCarousel, menu } };
}
