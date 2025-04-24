import MainSlider from "@/component/mainSlider";
import HomeCategory from "@/component/homeCategory";
import ProductCarousel from "@/component/productCarousel";
import { HomePageAPI, MegaMenuAPI } from "@/const/endPoint";
import Subscribe from "@/component/subscribe";
import InstagramPost from "@/component/instagramPost";
import { HomeProps, Product } from "@/utils/type";
import { HomeTransformer } from "@/utils/api/transformer/home";
import { getData } from "@/utils/api/fetchData/apiCall";
import { useScrollRestoration } from "@/utils/hooks";
import { useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import MetaTags from "@/component/metaTags";
import { MegaMenuTransformer } from "@/utils/api/transformer/megaMenu";

const fetchCHomeData = async () => {
  const data = await getData(HomePageAPI);
  return HomeTransformer(data).homeProductCarousel;
};

export default function Home({ homeProductCarousel }: HomeProps): JSX.Element {
  useScrollRestoration();

  const { data: carouselData } = useQuery<Product[]>({
    queryKey: ["homePage"],
    queryFn: () => fetchCHomeData(),
    initialData: homeProductCarousel || undefined,
    enabled: !homeProductCarousel,
    refetchOnMount: false,
  });

  return (
    <>
      <MetaTags />
      <MainSlider />
      <HomeCategory />
      <ProductCarousel product={carouselData} />
      <Subscribe />
      <InstagramPost />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const referer = context.req.headers.referer || null;

  if (!referer) {
    const data = await getData(HomePageAPI);
    const { homeProductCarousel } = HomeTransformer(data);
    const megaMenuData = await getData(MegaMenuAPI);
    const menu = MegaMenuTransformer(megaMenuData).menuItems;
    return { props: { homeProductCarousel, menu } };
  }

  return { props: { homeProductCarousel: null, menu: [] } };
}
