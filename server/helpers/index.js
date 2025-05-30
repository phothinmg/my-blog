import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
/**
 * @param {Date} date
 * @returns
 */
export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
  });
};

export const getConfig = async () => {
  const _configPath = path.resolve(process.cwd(), ".config");
  const tx = await fs.readFile(_configPath, "utf8");
  const txa = tx.split("\n");
  let obj = {};
  txa.forEach((t) => {
    const kv = t.split("=");
    const k = kv[0].trim();
    const v = kv[1].trim();
    obj[k] = v;
  });
  return obj;
};
