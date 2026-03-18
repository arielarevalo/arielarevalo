import { Hono } from "hono";
import type { AppEnv } from "../types.js";
import { getAgentCard } from "./agent-card.js";
import { handleA2ARequest } from "./handler.js";

const a2a = new Hono<AppEnv>();

a2a.get("/.well-known/agent-card.json", (c) => {
  const baseUrl = new URL(c.req.url).origin;
  return c.json(getAgentCard(baseUrl));
});

a2a.post("/a2a", async (c) => {
  const sessionId = c.get("sessionId");
  const body = await c.req.json();
  const result = handleA2ARequest(body, sessionId);
  return c.json(result);
});

export { a2a };
