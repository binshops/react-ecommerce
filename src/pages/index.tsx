import MainSlider from "@/component/mainSlider";
import HomeCategory from "@/component/homeCategory";
import ProductCarousel from "@/component/productCarousel";
import { HomePageAPI } from "@/const/endPoint";
import Subscribe from "@/component/subscribe";
import InstagramPost from "@/component/instagramPost";
import { HomeProps, Product } from "@/utils/type";
import { MegaMenuProvider } from "@/context/menuContext";
import { HomeTransformer } from "@/utils/api/transformer/home";
import { getData } from "@/utils/api/fetchData/apiCall";
import { useScrollRestoration } from "@/utils/hooks";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import MetaTags from "@/component/metaTags";

const fetchCHomeData = async () => {
  const data = await getData(HomePageAPI);
  return HomeTransformer(data).homeProductCarousel;
};

export default function Home({
  homeProductCarousel,
  menu,
}: HomeProps): JSX.Element {
  useScrollRestoration();
  const router = useRouter();
  const locale = router.locale || "en";
  const { data: carouselData } = useQuery<Product[]>(
    ["homePage"],
    () => fetchCHomeData(),

    {
      initialData: homeProductCarousel || undefined,
      enabled: !homeProductCarousel,
      refetchOnMount: false,
    }
  );

  return (
    <>
      <MegaMenuProvider initialMenu={menu} language={locale}>
        <MetaTags />
        <MainSlider />
        <HomeCategory />
        <ProductCarousel product={carouselData} />
        <Subscribe />
        <InstagramPost />
      </MegaMenuProvider>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const referer = context.req.headers.referer || null;
  if (!referer) {
    const data = await getData(HomePageAPI);
    const { homeProductCarousel } = HomeTransformer(data);

    return { props: { homeProductCarousel } };
  }
  return { props: { homeProductCarousel: null } };
}
