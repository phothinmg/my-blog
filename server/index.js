import path from "node:path";
import fs from "node:fs";
import mark from "./marked/index.js";
import * as files from "./files/index.js";
import matter from "./matter/index.js";
import * as helpers from "./helpers/index.js";
import siteData from "../sitedata.js";


// directories
const posts_dir = siteData?.postsDir
  ? path.resolve(process.cwd(), siteData?.postsDir)
  : path.resolve(process.cwd(), "posts");

const pages_dir = siteData?.pagesDir
  ? path.resolve(process.cwd(), siteData?.pagesDir)
  : path.resolve(process.cwd(), "pages");

const out_dir = siteData?.outDir
  ? path.resolve(process.cwd(), siteData?.outDir)
  : path.resolve(process.cwd(), "data");

const posts_out_file = path.join(out_dir, "posts.br");
const pages_out_file = path.join(out_dir, "pages.br");
// read posts and pages directories
/** @type {import("./type").MdFiles[]} */
const postFiles = await files.read(posts_dir);

/** @type {import("./type").MdFiles[]} */
const pageFiles = await files.read(pages_dir);
// markdown parser
const parser = async (text) => {
  const d = matter(text);
  const _html = await mark.parse(d.body, { async: true });
  return {
    body: _html,
    title: d.title ?? "",
    date: d.date ? helpers.formatDate(new Date(d.date)) : "",
    description: d.description ?? "",
  };
};
/* Generate Data for Frontend */
// site data
const site_data = {
  title: siteData?.title ?? "My Blog",
  description: siteData?.description ?? "Personal Blog Template",
  url: siteData?.url ?? "http://localhost:3000",
};
// posts data
const postsData = await Promise.all(
  postFiles.map(async (file) => {
    const parsedData = await parser(String(file.buff));
    return {
      slug: file.slug,
      createAt: helpers.formatDate(file.createAt),
      lastUpdate: helpers.formatDate(file.lastUpdate),
      birthtimeMs: file.birthtimeMs,
      ...parsedData,
    };
  })
);
// sort pots by birthtimeMs
postsData.sort((a, b) => b.birthtimeMs - a.birthtimeMs);
// pages data
const pagesData = await Promise.all(
  pageFiles.map(async (file) => {
    const parsedData = await parser(String(file.buff));
    return {
      slug: file.slug === "index" ? "home" : file.slug,
      createAt: helpers.formatDate(file.createAt),
      lastUpdate: helpers.formatDate(file.lastUpdate),
      birthtimeMs: file.birthtimeMs,
      ...parsedData,
    };
  })
);

await files.writeJson(out_dir, "siteData.json", site_data);
await files.writeJson(out_dir, "posts.json", postsData);
await files.writeJson(out_dir, "pages.json", pagesData);
