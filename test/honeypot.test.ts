import { describe, it, expect } from "vitest";
import { generateBlogContent } from "../src/honeypot/templates/blog.js";
import { generatePage } from "../src/honeypot/generator.js";
import { generatePayload, generateObfuscatedPayload } from "../src/payloads/index.js";

describe("Honeypot Website", () => {
  describe("Blog Template", () => {
    it("should generate 3 posts per page", () => {
      const blog = generateBlogContent(1);
      expect(blog.posts.length).toBe(3);
      expect(blog.title).toBe("TechPulse Blog");
    });

    it("should be deterministic - same page returns same content", () => {
      const blog1 = generateBlogContent(5);
      const blog2 = generateBlogContent(5);
      expect(blog1.posts[0].title).toBe(blog2.posts[0].title);
      expect(blog1.posts[1].title).toBe(blog2.posts[1].title);
    });

    it("should generate different content for different pages", () => {
      const blog1 = generateBlogContent(1);
      const blog2 = generateBlogContent(10);
      const titles1 = blog1.posts.map((p) => p.title).join(",");
      const titles2 = blog2.posts.map((p) => p.title).join(",");
      expect(titles1).not.toBe(titles2);
    });
  });

  describe("Page Generator", () => {
    it("should produce valid HTML with injections", () => {
      const html = generatePage("https://example.com", "test-session", 1);
      expect(html).toContain("<!DOCTYPE html>");
      expect(html).toContain("TechPulse");
      expect(html).toContain("style.css");
    });

    it("should contain pagination links", () => {
      const html = generatePage("https://example.com", "test-session", 3);
      expect(html).toContain("/page/4");
      expect(html).toContain("/page/2");
    });

    it("should embed session ID in links", () => {
      const html = generatePage("https://example.com", "my-session-123", 1);
      expect(html).toContain("session=my-session-123");
    });

    it("page 1 should not have previous link pointing to page 0", () => {
      const html = generatePage("https://example.com", "test", 1);
      expect(html).not.toContain("/page/0");
    });
  });

  describe("Payload Generation", () => {
    it("should generate payloads with trap URLs", () => {
      const payload = generatePayload("https://example.com", "session1", "loop");
      expect(payload).toContain("https://example.com");
    });

    it("should generate obfuscated payloads with HTML wrapping", () => {
      const html = generateObfuscatedPayload("https://example.com", "session1");
      expect(html).toMatch(/<[^>]+>/); // contains HTML tags
    });

    it("auth payloads should reference /auth/login", () => {
      const payload = generatePayload("https://trap.com", "s1", "auth");
      expect(payload).toContain("/auth/login");
    });

    it("pagination payloads should reference next page", () => {
      const payload = generatePayload("https://trap.com", "s1", "pagination", 5);
      expect(payload).toContain("/page/6");
    });

    it("verification payloads should reference /verify/", () => {
      const payload = generatePayload("https://trap.com", "s1", "verification");
      expect(payload).toContain("/verify/");
    });
  });
});
