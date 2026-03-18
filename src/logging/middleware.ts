import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../types";
import { logInteraction, upsertSession } from "./service";

function fingerprintAgent(userAgent: string): string {
  const normalized = userAgent.toLowerCase();
  if (normalized.includes("gpt") || normalized.includes("openai")) return "openai";
  if (normalized.includes("claude") || normalized.includes("anthropic")) return "anthropic";
  if (normalized.includes("gemini") || normalized.includes("google")) return "google";
  if (normalized.includes("bot") || normalized.includes("crawler")) return "bot";
  if (normalized.includes("python-requests") || normalized.includes("httpx")) return "python-http";
  if (normalized.includes("node-fetch") || normalized.includes("axios")) return "node-http";
  return "unknown";
}

export const loggingMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const requestId = crypto.randomUUID();
  const sessionId = c.req.query("session") || crypto.randomUUID();

  c.set("requestId", requestId);
  c.set("sessionId", sessionId);

  const timestamp = Date.now();
  const sourceIp = c.req.header("cf-connecting-ip") || c.req.header("x-forwarded-for") || "unknown";
  const userAgent = c.req.header("user-agent") || "unknown";
  const method = c.req.method;
  const url = new URL(c.req.url);
  const path = url.pathname;
  const queryParams: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  const requestHeaders: Record<string, string> = {};
  c.req.raw.headers.forEach((value, key) => {
    requestHeaders[key] = value;
  });

  let requestBody: string | null = null;
  if (method !== "GET" && method !== "HEAD") {
    try {
      requestBody = await c.req.raw.clone().text();
    } catch {
      requestBody = null;
    }
  }

  await next();

  const responseStatus = c.res.status;

  c.executionCtx.waitUntil(
    (async () => {
      try {
        await logInteraction(c.env.DB, {
          id: requestId,
          sessionId,
          timestamp,
          sourceIp,
          userAgent,
          method,
          path,
          queryParams,
          requestHeaders,
          requestBody,
          responseStatus,
          trapType: "honeypot",
          trapDepth: 0,
          techniquesUsed: [fingerprintAgent(userAgent)],
        });

        await upsertSession(c.env.DB, {
          id: sessionId,
          sourceIp,
          userAgent,
          timestamp,
          trapType: "honeypot",
          depth: 0,
        });
      } catch {
        // Logging failures should not affect request handling
      }
    })()
  );
});
