import React, { useEffect } from "react";
import Footer from "@/component/footer";
import Header from "@/component/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Raleway } from "next/font/google";
import NavigationBar from "@/component/navigationBar";
import { CartProvider } from "@/context/cartContext";
import { MegaMenuProvider } from "@/context/menuContext";
import { Toaster } from "react-hot-toast";
import "./../../i18n";
import { useRouter } from "next/router";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { queryClient } from "@/const/queryClient";

const inter = Raleway({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, [router]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary>
          <CartProvider>
            <MegaMenuProvider
              initialMenu={pageProps.menu || []}
              language={router.locale}
            >
              <main className={inter.className}>
                <Header />
                <div className="container">
                  <Toaster />
                  <Component {...pageProps} />
                </div>
                <NavigationBar />
                <Footer />
              </main>
            </MegaMenuProvider>
          </CartProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
