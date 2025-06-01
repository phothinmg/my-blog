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
