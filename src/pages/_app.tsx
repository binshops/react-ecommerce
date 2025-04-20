import React, { useEffect } from "react";
import Footer from "@/component/footer";
import Header from "@/component/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Raleway } from "next/font/google";
import NavigationBar from "@/component/navigationBar";
import { CartProvider } from "@/context/cartContext";
import { Toaster } from "react-hot-toast";
import "./../../i18n";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/const/queryClient";
import { Layout } from "@/component/Layout/layout";

const inter = Raleway({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { i18n } = useTranslation();
  const initialMenu = pageProps.initialMenu;

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, [router]);

  useEffect(() => {
    const { locale } = router;
    if (locale) {
      i18n.changeLanguage(locale);
    }
  }, [router.locale]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Layout initialMenu={initialMenu}>
            <main className={inter.className}>
              <Header />
              <div className="container">
                <Toaster />
                <Component {...pageProps} />
              </div>
              <NavigationBar />
              <Footer />
            </main>
          </Layout>
        </CartProvider>
      </QueryClientProvider>
    </>
  );
}
