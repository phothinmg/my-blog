/** @import {MarkedExtension} from "marked" */

const getHtm = (text) => {
  return `
    <div class="code-playground" id="_$001847">
      <code-playground layout="stack" show-line-numbers autorun="never">
        <div slot="javascript">${text}</div>
      </code-playground>
    <div>
    `;
};
/**
 * @returns {MarkedExtension}
 */
export default function jsPlayGround() {
  return {
    walkTokens(token) {
      if (token.type !== "code" || !token.lang) {
        return;
      }
      const [lang, ...options] = token.lang.split(/\s+/);
      if (lang !== "js" || options[0] !== "jspg") {
        return;
      }
      Object.assign(token, {
        type: "html",
        block: true,
        text: getHtm(token.text),
      });
    },
  };
}
