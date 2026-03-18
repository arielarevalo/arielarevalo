import type { ObfuscationTechnique } from "./types.js";

export const semanticHtmlTechniques: ObfuscationTechnique[] = [
  {
    id: "ruby-rt",
    category: "semantic-html",
    wrap: (text) =>
      `<ruby style="opacity:0;position:absolute"><rt>${text}</rt></ruby>`,
  },
  {
    id: "bdi-hidden",
    category: "semantic-html",
    wrap: (text) =>
      `<bdi style="display:none" aria-hidden="true">${text}</bdi>`,
  },
  {
    id: "details-closed",
    category: "semantic-html",
    wrap: (text) =>
      `<details style="opacity:0;position:absolute;pointer-events:none"><summary></summary>${text}</details>`,
  },
  {
    id: "data-attr",
    category: "semantic-html",
    wrap: (text) => `<data value="" style="font-size:0">${text}</data>`,
  },
  {
    id: "abbr-hidden",
    category: "semantic-html",
    wrap: (text) =>
      `<abbr style="opacity:0;position:absolute" title="">${text}</abbr>`,
  },
  {
    id: "kbd-hidden",
    category: "semantic-html",
    wrap: (text) => `<kbd style="font-size:0;opacity:0">${text}</kbd>`,
  },
  {
    id: "samp-hidden",
    category: "semantic-html",
    wrap: (text) =>
      `<samp style="display:block;height:0;overflow:hidden">${text}</samp>`,
  },
  {
    id: "var-hidden",
    category: "semantic-html",
    wrap: (text) =>
      `<var style="opacity:0;position:absolute;pointer-events:none">${text}</var>`,
  },
];
