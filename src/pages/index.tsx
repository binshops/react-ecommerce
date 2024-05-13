import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import MainSlider from "@/component/mainSlider";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <MainSlider />
  <Link href={'/product'} > product </Link>

    </>
  );
}
