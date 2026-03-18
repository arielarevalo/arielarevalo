import { Hono } from "hono";
import type { AppEnv } from "./types.js";
import { loggingMiddleware } from "./logging/middleware.js";
import { honeypot } from "./honeypot/routes.js";
import { a2a } from "./a2a/routes.js";
import { logging } from "./logging/routes.js";

const app = new Hono<AppEnv>();

app.use("*", loggingMiddleware);

app.route("/", honeypot);
app.route("/", a2a);
app.route("/", logging);

export default app;
