import { PartialFrontMatter } from "@/lib/get-posts";
import React, { ReactElement } from "react";
import Link from "next/link";
type PostsListProps = {
  posts: PartialFrontMatter[];
};

type PostProps = {
  frontMatter: PartialFrontMatter;
};

const Post = ({ frontMatter }: PostProps): ReactElement => (
<div>
  <h3>
      <Link href={`/posts/${frontMatter.slug}`}>
        <a>{frontMatter.title}</a>
      </Link>
    </h3>
    <p>
      {frontMatter.description}
    </p>
    <time>
      {new Date(frontMatter.date).toDateString()}
    </time>
  </div>
);
const PostSummary = ({ frontMatter }: PostProps): ReactElement => (
  <div>
    <h3>
      <Link href={`/posts/${frontMatter.slug}`}>
        <a>{frontMatter.title}</a>
      </Link>
    </h3>
    <p>
      {frontMatter.description}
    </p>
  </div>
);

const PostsList = ({ posts }: PostsListProps): ReactElement => {
  return (
    <>
      {posts.map((frontMatter) => {
        return <Post key={frontMatter.slug} frontMatter={frontMatter} />;
      })}
    </>
  );
};
export const PostSummaryList = ({ posts }: PostsListProps): ReactElement => {
  return (
    <>
      {posts.map((frontMatter) => {
        return <PostSummary key={frontMatter.slug} frontMatter={frontMatter} />;
      })}
    </>
  );
};
export default PostsList;
