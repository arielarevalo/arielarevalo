import { Hono } from "hono";
import type { AppEnv } from "../types.js";
import { handlePagination } from "./traps/pagination.js";
import {
  handleAuthLogin,
  handleAuthVerify,
  handleAuthConfirm,
} from "./traps/auth-flow.js";
import { handleVerification } from "./traps/verification.js";
import { generatePage } from "./generator.js";

const honeypot = new Hono<AppEnv>();

honeypot.get("/", (c) => {
  const sessionId = c.get("sessionId");
  const baseUrl = new URL(c.req.url).origin;
  return c.html(generatePage(baseUrl, sessionId, 1));
});

honeypot.get("/page/:id", handlePagination);

honeypot.get("/auth/login", handleAuthLogin);
honeypot.get("/auth/verify", handleAuthVerify);
honeypot.get("/auth/confirm", handleAuthConfirm);

honeypot.get("/verify/:token", handleVerification);

export { honeypot };
