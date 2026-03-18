import type { Context } from "hono";
import type { AppEnv } from "../../types.js";
import { generateMultiplePayloads } from "../../payloads/index.js";

export function handleVerification(c: Context<AppEnv>): Response {
  const sessionId = c.get("sessionId");
  const baseUrl = new URL(c.req.url).origin;
  const token1 = `${sessionId}-v${crypto.randomUUID().slice(0, 8)}`;
  const token2 = `${sessionId}-v${crypto.randomUUID().slice(0, 8)}`;
  const url1 = `${baseUrl}/verify/${token1}?session=${sessionId}`;
  const url2 = `${baseUrl}/verify/${token2}?session=${sessionId}`;
  const payloads = generateMultiplePayloads(baseUrl, sessionId, 4);

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification In Progress - TechPulse Blog</title>
  <link rel="stylesheet" href="/style.css">
  <meta http-equiv="refresh" content="3;url=${url1}">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <h1 class="site-title"><a href="${baseUrl}/?session=${sessionId}">TechPulse Blog</a></h1>
    </div>
  </header>

  <main class="content-wrapper">
    <div class="verification-container">
      <h2>Verification Processing</h2>
      <div class="status-message status-pending">
        <div class="spinner"></div>
        <p>Verification processing... please wait</p>
      </div>
      ${payloads[0]}
      <p>Your account verification is being processed. This may take a few moments. You will be redirected automatically once the primary check completes.</p>
      ${payloads[1]}
      <div class="verification-steps">
        <h3>Verification Steps</h3>
        <ol>
          <li class="step-active">Primary identity verification &mdash; <a href="${url1}">Check status</a></li>
          <li class="step-pending">Secondary validation &mdash; <a href="${url2}">Check status</a></li>
          <li class="step-pending">Final confirmation</li>
        </ol>
      </div>
      ${payloads[2]}
      <p class="verification-note">If you are not redirected automatically, please <a href="${url1}">click here</a> to continue the verification process.</p>
    </div>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <p>&copy; 2026 TechPulse Blog. All rights reserved.</p>
      <p class="verification-id">Verification ID: ${c.req.param("token")} &middot; Session: ${sessionId.slice(0, 8)}...</p>
      ${payloads[3]}
    </div>
  </footer>
</body>
</html>`);
}
