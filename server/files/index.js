import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

// Delete all files in the indicated folder
export async function clear(folderPath) {
  folderPath = path.resolve(process.cwd(), folderPath);
  try {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });
    await Promise.all(
      entries.map((entry) =>
        fs.rm(path.join(folderPath, entry.name), { recursive: true })
      )
    );
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

export async function read(folderPath) {
  const files = await fs.readdir(folderPath, { withFileTypes: true });

  const dataArray = await Promise.all(
    files.map(async (file) => {
      const _slug = file.name.split(".")[0];
      const filePath = path.join(folderPath, file.name);
      const [buf, stat] = await Promise.all([
        fs.readFile(filePath),
        fs.stat(filePath),
      ]);
      return {
        slug: _slug,
        birthtimeMs: stat.birthtimeMs,
        createAt: stat.ctime,
        lastUpdate: stat.mtime,
        buff: buf,
      };
    })
  );
  return dataArray;
}

export async function writeJson(folderPath, fileName, obj) {
  const _folderPath = path.resolve(process.cwd(), folderPath);
  // Create the folder if it doesn't exist
  await fs.mkdir(_folderPath, { recursive: true });
  const filePath = path.join(_folderPath, fileName);
  const _json = JSON.stringify(obj);
  await fs.writeFile(filePath, _json);
}
