import Head from "next/head";
import { MetaTagsProps } from "./metaTags.types";
import { FC } from "react";

const MetaTags: FC<MetaTagsProps> = ({
  title = "React E-Commerce Template",
  description,
}) => {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Head>
  );
};

export default MetaTags;
