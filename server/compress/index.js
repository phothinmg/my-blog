import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import zlib from "node:zlib";
import path from "node:path";

const compress = (input) => async (filePath) => {
  const b = Buffer.from(JSON.stringify(input));
  const compressed = zlib.brotliCompressSync(b);
  await fs.writeFile(filePath, compressed);
};

export default compress;
