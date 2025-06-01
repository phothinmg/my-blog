// This code are copied from https://github.com/WebOrigami/pondlife-zero-deps/blob/main/src/utilities.js
// by Jan Miksovsky - https://github.com/JanMiksovsky

/**
 * Parse a string content as a front-matter markdown file.
 *
 * The function takes a string content, parse it as a front-matter markdown file,
 * and returns an object with the following properties:
 *
 * - `body`: The content of the markdown file without the front-matter.
 *
 * - `key1`, `key2`, ...: The key-value pairs parsed from the front-matter.
 *
 * The function uses a regular expression to split the content into two parts:
 * the front-matter and the body. The front-matter is then parsed as key-value
 * pairs and added to the data object. The body is the content after the
 * front-matter.
 *
 * @param {string} content The content of the markdown file.
 *
 * @returns {import("../type").MatterResult} An object with the parsed key-value pairs and the body of
 * the markdown file.
 */
export default function matter(content) {
  let text = String(content);
  let data;
  const regex =
    /^(---\r?\n(?<frontText>[\s\S]*?\r?\n?)---\r?\n)(?<body>[\s\S]*$)/;
  const match = regex.exec(text);
  if (match?.groups) {
    const { frontText, body } = match.groups;
    text = body;
    // Parse each line of front text as `key: value` and add it to the data object.
    data = {};
    const lines = frontText.split("\n");
    for (const line of lines) {
      const [key, value] = line.split(":");
      if (key && value) {
        data[key] = value.trim();
      }
    }
  }
  return Object.assign({ body: text }, data);
}
