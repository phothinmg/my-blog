import { Marked } from "marked";
import markedAlert from "marked-alert";
import markedKatex from "marked-katex-extension";
import jsPlayGround from "./cpl.js";

const mark = new Marked();

// extensions , hooks
mark.use(markedAlert());
mark.use(markedKatex({ throwOnError: false }));
mark.use(jsPlayGround());

//
export default mark;
