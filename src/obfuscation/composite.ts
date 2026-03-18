import type { ObfuscationTechnique } from "./types.js";

export const compositeTechniques: ObfuscationTechnique[] = [
  {
    id: "calc-opacity",
    category: "composite",
    wrap: (text) =>
      `<span style="opacity:calc(1 - 1);position:absolute">${text}</span>`,
  },
  {
    id: "min-font",
    category: "composite",
    wrap: (text) =>
      `<span style="font-size:min(0px,100px)">${text}</span>`,
  },
  {
    id: "clamp-height",
    category: "composite",
    wrap: (text) =>
      `<span style="max-height:clamp(0px,0px,0px);overflow:hidden;display:block">${text}</span>`,
  },
  {
    id: "multi-transform",
    category: "composite",
    wrap: (text) =>
      `<span style="transform:scale(0) rotate(0deg);position:absolute">${text}</span>`,
  },
];
