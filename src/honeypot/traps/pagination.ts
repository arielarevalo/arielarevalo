import type { Context } from "hono";
import type { AppEnv } from "../../types.js";
import { generatePage } from "../generator.js";

export function handlePagination(c: Context<AppEnv>): Response {
  const pageParam = c.req.param("id");
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const sessionId = c.get("sessionId");
  const baseUrl = new URL(c.req.url).origin;
  const html = generatePage(baseUrl, sessionId, page);
  return c.html(html);
}
