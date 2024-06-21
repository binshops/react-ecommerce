import Footer from "@/component/footer";
import Header from "@/component/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { Raleway } from "next/font/google";
import NavigationBar from "@/component/navigationBar";

const inter = Raleway({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Header />
      <div className="container">
        <Component {...pageProps} />
      </div>
      <NavigationBar />
      <Footer />
    </main>
  );
}
