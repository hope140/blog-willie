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
  <div className="post-item">
    <h3>
      <Link href={`/posts/${frontMatter.slug}`}>
        <a className="post-item-title">{frontMatter.title}</a>
      </Link>
    </h3>
    <p className="post-item-desc">
      {frontMatter.description}
      <Link href={`/posts/${frontMatter.slug}`}>
        <a className="post-item-more">Read More →</a>
      </Link>
    </p>
    <time className="post-item-date">
      {new Date(frontMatter.date).toDateString()}
    </time>
  </div>
);
const PostSummary = ({ frontMatter }: PostProps): ReactElement => (
  <div className="post-item">
    <h3>
      <Link href={`/posts/${frontMatter.slug}`}>
        <a className="post-item-title">{frontMatter.title}</a>
      </Link>
    </h3>
    <p className="post-item-desc">
      {frontMatter.description}{" "}
      <Link href={`/posts/${frontMatter.slug}`}>
        <a className="post-item-more">Read More →</a>
      </Link>
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
