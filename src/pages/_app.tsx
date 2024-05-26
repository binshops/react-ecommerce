import Footer from "@/component/footer";
import Header from "@/component/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { Raleway } from "next/font/google";

const inter = Raleway({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}
