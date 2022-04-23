import path from "path";

export const CONTENT_DIR = "_posts";
export const root = process.cwd();

export const contentPath = (...pathElements: string[]): string => {
  return path.join(root, CONTENT_DIR, ...pathElements);
};
