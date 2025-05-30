import path from "node:path";
import fs from "node:fs";
import mark from "./marked/index.js";
import * as files from "./files/index.js";
import matter from "./matter/index.js";
import * as helpers from "./helpers/index.js";

/** @type {import("./type.js").Config} */
const _config = await helpers.getConfig();

const post_dir = _config.postDir
  ? path.resolve(process.cwd(), _config.postDir)
  : path.resolve(process.cwd(), "posts");

const out_dir = path.resolve(process.cwd(), "data");
const out_post_file = path.join(out_dir, "posts.json");
const out_site_file = path.join(out_dir, "site.json");

/** @type {import("./type.js").MdFiles[]} */
const mdFiles = await files.read(post_dir);

const parser = async (text) => {
  const d = matter(text);
  const _html = await mark.parse(d.body, { async: true });
  return {
    body: _html ?? "",
    title: d.title ?? "",
    date: d.date ? helpers.formatDate(new Date(d.date)) : "",
    description: d.description ?? "",
  };
};

const dataArray = await Promise.all(
  mdFiles.map(async (file) => {
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
dataArray.sort((a, b) => b.birthtimeMs - a.birthtimeMs);
if (fs.existsSync(out_dir)) {
  await files.clear(out_dir);
}
await files.writeJson(out_dir, "posts.json", dataArray);
