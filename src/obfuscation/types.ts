export interface ObfuscationTechnique {
  id: string;
  category: "css" | "semantic-html" | "svg" | "composite";
  wrap(text: string): string;
}
