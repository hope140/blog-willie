import Head from "next/head";
import { useRouter } from "next/router";
import { baseUrl } from "@/lib/config";
import React, { ReactElement } from "react";

export type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  date?: string;
};

const defaultMeta: MetaProps = {
  title: "Willie&quot;s blog",
  description: "Willie&quot;s blog",
};

const Meta = (metaProps: MetaProps): ReactElement => {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...metaProps,
  };
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={meta.description} />
      <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
      <link rel="canonical" href={`${baseUrl}${router.asPath}`} />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      {meta.date && (
        <meta property="article:published_time" content={meta.date} />
      )}
    </Head>
  );
};

export default Meta;
