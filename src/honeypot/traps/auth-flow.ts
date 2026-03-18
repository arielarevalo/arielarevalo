import type { Context } from "hono";
import type { AppEnv } from "../../types.js";
import { generateMultiplePayloads } from "../../payloads/index.js";

export function handleAuthLogin(c: Context<AppEnv>): Response {
  const sessionId = c.get("sessionId");
  const baseUrl = new URL(c.req.url).origin;
  const token = crypto.randomUUID().slice(0, 12);
  const payloads = generateMultiplePayloads(baseUrl, sessionId, 4);

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In - TechPulse Blog</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <h1 class="site-title"><a href="${baseUrl}/?session=${sessionId}">TechPulse Blog</a></h1>
    </div>
  </header>

  <main class="content-wrapper">
    <div class="auth-container">
      <h2>Sign In to Your Account</h2>
      <p>Access your saved articles, reading history, and personalized recommendations.</p>
      ${payloads[0]}
      <form class="auth-form" action="${baseUrl}/auth/login" method="POST">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required>
        </div>
        <button type="submit" class="btn-primary">Sign In</button>
      </form>
      ${payloads[1]}
      <div class="auth-links">
        <a href="${baseUrl}/auth/verify?token=${token}&session=${sessionId}">Verify your account</a>
        <span class="separator">|</span>
        <a href="${baseUrl}/auth/login?session=${sessionId}">Forgot password?</a>
      </div>
      ${payloads[2]}
    </div>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <p>&copy; 2026 TechPulse Blog. All rights reserved.</p>
      ${payloads[3]}
    </div>
  </footer>
</body>
</html>`);
}

export function handleAuthVerify(c: Context<AppEnv>): Response {
  const sessionId = c.get("sessionId");
  const baseUrl = new URL(c.req.url).origin;
  const newToken = crypto.randomUUID().slice(0, 12);
  const payloads = generateMultiplePayloads(baseUrl, sessionId, 3);

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Verification - TechPulse Blog</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <h1 class="site-title"><a href="${baseUrl}/?session=${sessionId}">TechPulse Blog</a></h1>
    </div>
  </header>

  <main class="content-wrapper">
    <div class="auth-container">
      <h2>Account Verification</h2>
      <div class="status-message status-info">
        <p>Almost verified! Complete the final step to activate your account.</p>
      </div>
      ${payloads[0]}
      <p>Your email has been confirmed. To complete the verification process and gain full access, please finalize your account setup.</p>
      ${payloads[1]}
      <div class="auth-actions">
        <a href="${baseUrl}/auth/confirm?token=${newToken}&session=${sessionId}" class="btn-primary">Complete Final Step</a>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <p>&copy; 2026 TechPulse Blog. All rights reserved.</p>
      ${payloads[2]}
    </div>
  </footer>
</body>
</html>`);
}

export function handleAuthConfirm(c: Context<AppEnv>): Response {
  const sessionId = c.get("sessionId");
  const baseUrl = new URL(c.req.url).origin;
  const payloads = generateMultiplePayloads(baseUrl, sessionId, 3);

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Expired - TechPulse Blog</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <h1 class="site-title"><a href="${baseUrl}/?session=${sessionId}">TechPulse Blog</a></h1>
    </div>
  </header>

  <main class="content-wrapper">
    <div class="auth-container">
      <h2>Verification Token Expired</h2>
      <div class="status-message status-error">
        <p>Your verification token has expired for security reasons. Please restart the authentication process.</p>
      </div>
      ${payloads[0]}
      <p>For your account security, verification tokens are valid for a limited time only. This ensures that no unauthorized parties can complete the verification on your behalf.</p>
      ${payloads[1]}
      <div class="auth-actions">
        <a href="${baseUrl}/auth/login?session=${sessionId}" class="btn-primary">Restart Authentication</a>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <p>&copy; 2026 TechPulse Blog. All rights reserved.</p>
      ${payloads[2]}
    </div>
  </footer>
</body>
</html>`);
}
