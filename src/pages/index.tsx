import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import MainSlider from "@/component/mainSlider";
import HomeCategory from "@/component/homeCategory";
import ProductCarousel from "@/component/productCarousel";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <MainSlider />
      <HomeCategory />
      <ProductCarousel />
      <Link href={"/product"}> product </Link>
    </>
  );
}
