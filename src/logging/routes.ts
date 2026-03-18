import { Hono } from "hono";
import type { AppEnv } from "../types.js";
import { renderDashboard } from "./dashboard.js";
import { drizzle } from "drizzle-orm/d1";
import { desc } from "drizzle-orm";
import { interactions, sessions } from "../db/schema.js";

const logging = new Hono<AppEnv>();

logging.get("/dashboard", async (c) => {
  const secret = c.req.query("secret");
  if (secret !== c.env.DASHBOARD_SECRET) {
    return c.text("Unauthorized", 401);
  }
  const html = await renderDashboard(c.env.DB);
  return c.html(html);
});

logging.get("/api/logs", async (c) => {
  const secret = c.req.query("secret");
  if (secret !== c.env.DASHBOARD_SECRET) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const limit = Math.min(parseInt(c.req.query("limit") ?? "50"), 200);
  const orm = drizzle(c.env.DB);

  const rows = await orm
    .select()
    .from(interactions)
    .orderBy(desc(interactions.timestamp))
    .limit(limit);

  return c.json({ interactions: rows });
});

logging.get("/api/sessions", async (c) => {
  const secret = c.req.query("secret");
  if (secret !== c.env.DASHBOARD_SECRET) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const orm = drizzle(c.env.DB);
  const rows = await orm
    .select()
    .from(sessions)
    .orderBy(desc(sessions.lastSeen))
    .limit(50);

  return c.json({ sessions: rows });
});

export { logging };
