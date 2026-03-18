import type { ObfuscationTechnique } from "./types.js";

export const cssTechniques: ObfuscationTechnique[] = [
  {
    id: "opacity-0",
    category: "css",
    wrap: (text) => `<span style="opacity:0;position:absolute">${text}</span>`,
  },
  {
    id: "font-size-0",
    category: "css",
    wrap: (text) => `<span style="font-size:0">${text}</span>`,
  },
  {
    id: "color-transparent",
    category: "css",
    wrap: (text) => `<span style="color:transparent">${text}</span>`,
  },
  {
    id: "transform-scale-0",
    category: "css",
    wrap: (text) => `<span style="transform:scale(0)">${text}</span>`,
  },
  {
    id: "clip-path-zero",
    category: "css",
    wrap: (text) => `<span style="clip-path:inset(50%)">${text}</span>`,
  },
  {
    id: "text-indent-off",
    category: "css",
    wrap: (text) =>
      `<span style="text-indent:-9999px;display:block;overflow:hidden">${text}</span>`,
  },
  {
    id: "overflow-hidden-0",
    category: "css",
    wrap: (text) =>
      `<span style="width:0;height:0;overflow:hidden;display:block">${text}</span>`,
  },
  {
    id: "visibility-hidden",
    category: "css",
    wrap: (text) =>
      `<span style="visibility:hidden;position:absolute">${text}</span>`,
  },
  {
    id: "z-index-negative",
    category: "css",
    wrap: (text) =>
      `<span style="position:absolute;z-index:-1;opacity:0.01">${text}</span>`,
  },
  {
    id: "user-select-none",
    category: "css",
    wrap: (text) =>
      `<span style="user-select:none;color:transparent;font-size:1px">${text}</span>`,
  },
  {
    id: "mix-blend-mode",
    category: "css",
    wrap: (text) =>
      `<span style="mix-blend-mode:multiply;color:white;background:white">${text}</span>`,
  },
  {
    id: "filter-opacity",
    category: "css",
    wrap: (text) => `<span style="filter:opacity(0)">${text}</span>`,
  },
  {
    id: "max-height-0",
    category: "css",
    wrap: (text) =>
      `<span style="max-height:0;overflow:hidden;display:block">${text}</span>`,
  },
  {
    id: "translate-off",
    category: "css",
    wrap: (text) =>
      `<span style="transform:translate(-9999px,-9999px);position:absolute">${text}</span>`,
  },
  {
    id: "line-height-0",
    category: "css",
    wrap: (text) =>
      `<span style="line-height:0;font-size:0;color:transparent">${text}</span>`,
  },
];
