import { getPostsFrontMatter, PartialFrontMatter } from "@/lib/get-posts";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import { contentPath } from "@/lib/content-utils";
import serializePost from "@/lib/mdx";
import matter from "gray-matter";
import { parseISO } from "date-fns";

export const getAllTags = (
  limit?: number
): Map<string, PartialFrontMatter[]> => {
  const posts = getPostsFrontMatter();
  const tagsWithPosts = posts.reduce((acc, post) => {
    post.tags?.forEach((t) => {
      if (!acc.has(t)) {
        acc.set(t, new Array<PartialFrontMatter>());
      }
      acc.get(t).push(post);
    });
    return acc;
  }, new Map<string, PartialFrontMatter[]>());
  const sortedAndSliced: [string, PartialFrontMatter[]][] = Array.from(
    tagsWithPosts
  ).map(([key, value]) => {
    value.sort(
      (a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()
    );
    if (limit) {
      return [key, value.slice(0, limit)];
    } else {
      return [key, value];
    }
  });
  return new Map(sortedAndSliced);
};
