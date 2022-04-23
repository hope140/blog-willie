import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkCodeTitles from "remark-code-titles";
import remarkCapitalize from "remark-capitalize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkTextr from "remark-textr";
import apostrophes from "typographic-apostrophes";
import quotes from "typographic-quotes";
import apostrophesForPlurals from "typographic-apostrophes-for-possessive-plurals";
import arrows from "typographic-arrows";
import copyright from "typographic-copyright";
import ellipses from "typographic-ellipses";
import enDashes from "typographic-en-dashes";
import emDashes from "typographic-em-dashes";
import mathSymbols from "typographic-math-symbols";
import registeredTrademark from "typographic-registered-trademark";
import singleSpaces from "typographic-single-spaces";
import trademark from "typographic-trademark";
import imageSize from "rehype-img-size";
import remarkUnwrapImages from "remark-unwrap-images";
import mdxPrism from "mdx-prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const serializePost = async (
  content: string
): Promise<MDXRemoteSerializeResult> => {
  return await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkUnwrapImages,
        remarkCodeTitles,
        [remarkMath],
        [remarkCapitalize],
        [
          remarkTextr,
          {
            plugins: [
              apostrophes,
              quotes,
              apostrophesForPlurals,
              arrows,
              copyright,
              ellipses,
              enDashes,
              emDashes,
              mathSymbols,
              registeredTrademark,
              singleSpaces,
              trademark,
            ],
          },
        ],
      ],
      rehypePlugins: [
        mdxPrism,
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypeKatex],
        [imageSize, { dir: "public" }],
      ],
    },
  });
};

export default serializePost;
