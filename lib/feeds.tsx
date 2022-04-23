import { Feed, Item } from "feed";
import { baseUrl, copyright } from "@/lib/config";
import fs from "fs";
import ReactDOMServer from "react-dom/server";
import makeTitle from "title";
import { parseISO } from "date-fns";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
import { stripHtml } from "string-strip-html";
import { getPostsWithContent, PostData } from "@/lib/get-posts";

const buildFeed = (): Feed => {
  return new Feed({
    title: "Willie",
    description: "RSS for blog",
    id: "https://www.wll.moe",
    link: "https://www.wll.moe",
    language: "en",
    copyright: copyright,
    feedLinks: {
      json: `${baseUrl}/feeds/feed.json`,
      atom: `${baseUrl}/feeds/atom.xml`,
      rss2: `${baseUrl}/feeds/feed.xml`,
    },
  });
};

const makeItem = (post: PostData): Item => {
  const url = `${baseUrl}/posts/${post.frontMatter.slug}`;
  const htmlContent = ReactDOMServer.renderToStaticMarkup(
    <MDXRemote {...post.mdxSource} />
  )
    .replace(/href="\/#/g, `href="${url}#`)
    .replace(/href="\//g, `href="${baseUrl}/`)
    .replace(/src="\//g, `src="${baseUrl}/`);
  const cleanHtmlContent = stripHtml(htmlContent, {
    onlyStripTags: ["script", "style"],
    stripTogetherWithTheirContents: ["script", "style"],
  }).result;
  return {
    title: makeTitle(post.frontMatter.title),
    link: url,
    id: url,
    date: parseISO(post.frontMatter.date),
    description: post.frontMatter.description,
    content: cleanHtmlContent,
  };
};

export const generateMainFeeds = async (): Promise<void> => {
  const feed = buildFeed();
  const posts = await getPostsWithContent();
  posts.forEach((post) => feed.addItem(makeItem(post)));
  fs.mkdirSync("public/feeds/", { recursive: true });
  fs.writeFileSync("public/feeds/feed.xml", feed.rss2());
  fs.writeFileSync("public/feeds/feed.json", feed.json1());
  fs.writeFileSync("public/feeds/atom.xml", feed.atom1());
};

export default buildFeed;
