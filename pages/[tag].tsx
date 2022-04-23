import { GetStaticPaths, GetStaticProps } from "next";
import React, { ReactNode } from "react";
import { getAllTags } from "@/lib/tags";
import { PartialFrontMatter } from "@/lib/get-posts";
import PostsList from "@/components/PostsList";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents } from "@/components/MDXComponents";
import Link from "next/link";
import Layout from "@/components/layouts";

type TagProps = {
  tag: string;
  posts: PartialFrontMatter[];
};

const TagPage = ({ tag, posts }: TagProps): ReactNode => {
  return (
    <Layout title={tag}>
      <h1>Tag &quot;{tag}&quot;</h1>
      <PostsList posts={posts} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params.tag as string;
  const tagsWithPosts = getAllTags();
  return {
    props: {
      tag: tag,
      posts: tagsWithPosts.get(tag),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tagsWithPosts = getAllTags();
  return {
    paths: [...tagsWithPosts.keys()].map((t) => ({
      params: {
        tag: t,
      },
    })),
    fallback: false,
  };
};

export default TagPage;
