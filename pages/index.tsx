import React, { ReactNode } from "react";
import { GetStaticProps } from "next";
import { getPostsFrontMatter, PartialFrontMatter } from "@/lib/get-posts";
import PostsList from "@/components/PostsList";
import Layout from "@/components/layouts";
import { generateMainFeeds } from "@/lib/feeds";
import Link from "next/link";

type WritingsOverviewProps = {
  allPosts: PartialFrontMatter[];
};

const WritingsOverviewPage = ({
  allPosts,
}: WritingsOverviewProps): ReactNode => (
  <Layout title="Blog Index">
    <ul>
      <PostsList posts={allPosts} />
    </ul>
  </Layout>
);

export const getStaticProps: GetStaticProps = () => {
  generateMainFeeds();
  const allPosts = getPostsFrontMatter();
  return {
    props: {
      allPosts,
    },
  };
};

export default WritingsOverviewPage;
