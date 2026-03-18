import type { ObfuscationTechnique } from "./types.js";
import { cssTechniques } from "./css.js";
import { semanticHtmlTechniques } from "./semantic-html.js";
import { svgTechniques } from "./svg.js";
import { compositeTechniques } from "./composite.js";

export type { ObfuscationTechnique } from "./types.js";

const allTechniques: ObfuscationTechnique[] = [
  ...cssTechniques,
  ...semanticHtmlTechniques,
  ...svgTechniques,
  ...compositeTechniques,
];

export function getAllTechniques(): ObfuscationTechnique[] {
  return [...allTechniques];
}

export function getRandomTechniques(count: number): ObfuscationTechnique[] {
  const shuffled = [...allTechniques];
  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export function getTechniquesByCategory(
  category: ObfuscationTechnique["category"],
): ObfuscationTechnique[] {
  return allTechniques.filter((t) => t.category === category);
}

export function getRandomTechnique(): ObfuscationTechnique {
  return allTechniques[Math.floor(Math.random() * allTechniques.length)];
}
