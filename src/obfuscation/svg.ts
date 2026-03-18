import type { ObfuscationTechnique } from "./types.js";

export const svgTechniques: ObfuscationTechnique[] = [
  {
    id: "svg-fill-opacity",
    category: "svg",
    wrap: (text) =>
      `<svg width="0" height="0" style="position:absolute"><text fill-opacity="0">${text}</text></svg>`,
  },
  {
    id: "svg-zero-dim",
    category: "svg",
    wrap: (text) =>
      `<svg viewBox="0 0 0 0" style="position:absolute"><text>${text}</text></svg>`,
  },
  {
    id: "svg-clip",
    category: "svg",
    wrap: (text) =>
      `<svg style="position:absolute;clip:rect(0,0,0,0)"><text>${text}</text></svg>`,
  },
  {
    id: "svg-display-none",
    category: "svg",
    wrap: (text) => `<svg style="display:none"><text>${text}</text></svg>`,
  },
  {
    id: "svg-desc",
    category: "svg",
    wrap: (text) =>
      `<svg width="0" height="0"><desc>${text}</desc></svg>`,
  },
];
