import { useEffect } from "react";
import { useRouter } from "next/router";

export const useScrollRestoration = () => {
  const router = useRouter();

  useEffect(() => {
    const saveScrollPosition = (url: string) => {
      const scrollPositions = JSON.parse(
        sessionStorage.getItem("scrollPositions") || "{}"
      );
      scrollPositions[url] = { x: window.scrollX, y: window.scrollY };
      sessionStorage.setItem(
        "scrollPositions",
        JSON.stringify(scrollPositions)
      );
    };

    const restoreScrollPosition = (url: string) => {
      const scrollPositions = JSON.parse(
        sessionStorage.getItem("scrollPositions") || "{}"
      );
      const position = scrollPositions[url];
      if (position) {
        setTimeout(() => {
          window.scrollTo(position.x, position.y);
        }, 0);
      }
    };

    const handleRouteChangeStart = () => {
      saveScrollPosition(router.asPath);
    };

    const handleRouteChangeComplete = (url: string) => {
      restoreScrollPosition(url);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);
};
