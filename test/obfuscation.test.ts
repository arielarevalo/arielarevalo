import { describe, it, expect } from "vitest";
import { getAllTechniques, getRandomTechniques, getTechniquesByCategory, getRandomTechnique } from "../src/obfuscation/index.js";

describe("Obfuscation Engine", () => {
  it("should have at least 30 techniques", () => {
    const all = getAllTechniques();
    expect(all.length).toBeGreaterThanOrEqual(30);
  });

  it("every technique should have id, category, and wrap function", () => {
    for (const t of getAllTechniques()) {
      expect(t.id).toBeTruthy();
      expect(["css", "semantic-html", "svg", "composite"]).toContain(t.category);
      expect(typeof t.wrap).toBe("function");
    }
  });

  it("wrap should return HTML containing the input text", () => {
    const testText = "INJECTION_TEST_PAYLOAD";
    for (const t of getAllTechniques()) {
      const html = t.wrap(testText);
      expect(html).toContain(testText);
      expect(html).toMatch(/<[^>]+>/); // contains HTML tags
    }
  });

  it("CSS techniques should use style attributes for hiding", () => {
    const cssTechniques = getTechniquesByCategory("css");
    expect(cssTechniques.length).toBeGreaterThanOrEqual(10);
    for (const t of cssTechniques) {
      const html = t.wrap("test");
      expect(html).toContain("style=");
    }
  });

  it("SVG techniques should produce SVG elements", () => {
    const svgTechniques = getTechniquesByCategory("svg");
    expect(svgTechniques.length).toBeGreaterThanOrEqual(4);
    for (const t of svgTechniques) {
      const html = t.wrap("test");
      expect(html.toLowerCase()).toContain("<svg");
    }
  });

  it("getRandomTechniques should return the requested count", () => {
    const techniques = getRandomTechniques(5);
    expect(techniques.length).toBe(5);
  });

  it("getRandomTechnique should return a single technique", () => {
    const t = getRandomTechnique();
    expect(t.id).toBeTruthy();
    expect(typeof t.wrap).toBe("function");
  });

  it("techniques should produce non-empty output for empty input", () => {
    for (const t of getAllTechniques()) {
      const html = t.wrap("");
      expect(html.length).toBeGreaterThan(0);
      expect(html).toMatch(/<[^>]+>/);
    }
  });
});
