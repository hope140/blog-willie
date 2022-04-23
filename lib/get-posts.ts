import matter from "gray-matter";
import fs from "fs";
import readingTime from "reading-time";
import { parseISO } from "date-fns";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import serializePost from "@/lib/mdx";
import { contentPath } from "@/lib/content-utils";

export type FrontMatter = {
  wordCount: number;
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  description?: string;
  tags?: string[];
};

export type PartialFrontMatter = Pick<
  FrontMatter,
  "slug" | "title" | "date" | "description" | "tags"
>;

export type PostFile = {
  fileName: string;
  slug: string;
};

export type PostData = {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: FrontMatter;
};

const getPost = (slug: string): matter.GrayMatterFile<string> => {
  const postSource = fs.readFileSync(contentPath(`${slug}.mdx`), "utf8");
  return matter(postSource);
};

export const getAndSerializePost = async (slug: string): Promise<PostData> => {
  const { data, content } = getPost(slug);
  const { title, date, description, tags } = data;
  const mdxSource = await serializePost(content);
  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      slug: slug,
      title: title,
      date: date,
      readingTime: readingTime(content).text,
      description: description ?? null,
      tags: tags ?? null,
    },
  };
};
export const getPosts = (): PostFile[] =>
  fs.readdirSync(contentPath()).map((fileName) => {
    return {
      fileName,
      slug: fileName.replace(".mdx", ""),
    };
  });

export const getPostsFrontMatter = (limit?: number): PartialFrontMatter[] => {
  const posts = getPosts();
  const sortedFrontmatter = posts
    .map((post) => {
      const { data } = getPost(post.slug);
      return {
        slug: post.slug,
        title: data.title,
        date: data.date,
        description: data.description ?? null,
        tags: data.tags ?? null,
      };
    })
    .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());
  if (limit) {
    return sortedFrontmatter.slice(0, limit);
  } else {
    return sortedFrontmatter;
  }
};

export const getPostsWithContent = async (
  limit?: number
): Promise<PostData[]> => {
  const posts = getPosts();
  const serializedPosts = await Promise.all(
    posts.map((p) => getAndSerializePost(p.slug))
  );
  serializedPosts.sort(
    (a, b) =>
      parseISO(b.frontMatter.date).getTime() -
      parseISO(a.frontMatter.date).getTime()
  );
  if (limit) {
    return serializedPosts.slice(0, limit);
  } else {
    return serializedPosts;
  }
};
