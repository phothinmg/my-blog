/**
 * @typedef PostsData
 * @property {string} slug
 * @property {number} birthtimeMs
 * @property {string} createAt
 * @property {string} lastUpdate
 * @property {string} body
 * @property {string} title
 * @property {string} date
 * @property {string} description
 */
const brotli = await import(
  "https://unpkg.com/brotli-wasm@3.0.0/index.web.js?module"
).then((m) => m.default);
/**
 *
 * @param {string} url
 * @returns {PostsData[]}
 */
export const loadUrl = async (url) => {
  const res = await fetch(url);
  const buff = await res.arrayBuffer();
  const decom = brotli.decompress(new Uint8Array(buff));
  const txt = new TextDecoder().decode(decom);
  return JSON.parse(txt);
};
