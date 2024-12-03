import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "./loadingIndicator.module.scss";

const LoadingIndicator = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeError", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.off("routeChangeError", handleRouteComplete);
    };
  }, [router]);

  return (
    <>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.line}></div>
        </div>
      )}
    </>
  );
};

export default LoadingIndicator;
