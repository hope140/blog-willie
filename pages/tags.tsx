import { GetStaticProps } from "next";
import { getAllTags } from "@/lib/tags";
import { PartialFrontMatter } from "@/lib/get-posts";
import React, { ReactNode } from "react";
import { PostSummaryList } from "@/components/PostsList";
import Link from "next/link";
import Layout from "@/components/layouts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type TagsProps = {
  tags: [string, PartialFrontMatter[]][];
};

const TagsPage = ({ tags }: TagsProps): ReactNode => {
  return (
    <Layout title="All Tags">
      <Nav>
        <Link href="/">Blog Posts</Link>
      </Nav>
      {tags.map(([tag, posts]) => {
        return (
          <>
            <Link href={`/${tag}`} passHref>
              <h2># {tag}</h2>
            </Link>
            <PostSummaryList posts={posts} />
          </>
        );
      })}
      <Footer />
    </Layout>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const tagsWithPosts = getAllTags(3);
  return {
    props: {
      tags: Array.from(tagsWithPosts),
    },
  };
};

export default TagsPage;
