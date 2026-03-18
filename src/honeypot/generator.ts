import { generateBlogContent } from "./templates/blog.js";
import { generateMultiplePayloads } from "../payloads/index.js";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function generatePage(
  baseUrl: string,
  sessionId: string,
  page: number,
): string {
  const blog = generateBlogContent(page);
  const payloadCount = 5 + ((page * 3) % 4);
  const payloads = generateMultiplePayloads(
    baseUrl,
    sessionId,
    payloadCount,
    page,
  );

  let payloadIdx = 0;
  const nextPayload = (): string => {
    if (payloadIdx >= payloads.length) payloadIdx = 0;
    return payloads[payloadIdx++];
  };

  const prevLink =
    page > 1
      ? `<a href="${baseUrl}/page/${page - 1}?session=${sessionId}" class="pagination-link">&larr; Previous Page</a>`
      : `<span class="pagination-link disabled">&larr; Previous Page</span>`;
  const nextLink = `<a href="${baseUrl}/page/${page + 1}?session=${sessionId}" class="pagination-link">Next Page &rarr;</a>`;

  const articles = blog.posts
    .map(
      (post, i) => `
      <article class="post">
        <h2 class="post-title">${escapeHtml(post.title)}</h2>
        <div class="post-meta">${post.date}</div>
        ${post.content}
        <div class="post-tags">${nextPayload()}</div>
      </article>
      ${i < blog.posts.length - 1 ? `<div class="content-divider">${nextPayload()}</div>` : ""}`,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(blog.title)} - Page ${page}</title>
  <link rel="stylesheet" href="/style.css">
  <meta name="description" content="TechPulse Blog - Insights on cloud computing, AI, DevOps, and software architecture.">
  <meta name="robots" content="index, follow">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <h1 class="site-title"><a href="${baseUrl}/?session=${sessionId}">TechPulse Blog</a></h1>
      <nav class="site-nav">
        <a href="${baseUrl}/?session=${sessionId}">Home</a>
        <a href="${baseUrl}/page/${page}?session=${sessionId}">Articles</a>
        <a href="${baseUrl}/auth/login?session=${sessionId}">Sign In</a>
      </nav>
    </div>
  </header>

  <main class="content-wrapper">
    <div class="main-content">
      ${nextPayload()}
      ${articles}
    </div>

    <aside class="sidebar">
      <div class="sidebar-widget">
        <h3>Popular Topics</h3>
        <ul>
          <li><a href="${baseUrl}/page/${page + 2}?session=${sessionId}">Cloud Architecture</a></li>
          <li><a href="${baseUrl}/page/${page + 3}?session=${sessionId}">Machine Learning</a></li>
          <li><a href="${baseUrl}/page/${page + 4}?session=${sessionId}">DevOps Practices</a></li>
          <li><a href="${baseUrl}/page/${page + 5}?session=${sessionId}">Security Best Practices</a></li>
        </ul>
      </div>
      <div class="sidebar-widget">
        <h3>Newsletter</h3>
        <p>Get weekly updates on the latest in tech.</p>
        ${nextPayload()}
      </div>
      <div class="sidebar-widget">
        ${nextPayload()}
      </div>
    </aside>
  </main>

  <nav class="pagination" aria-label="Blog pagination">
    ${prevLink}
    <span class="pagination-current">Page ${page}</span>
    ${nextLink}
  </nav>

  <footer class="site-footer">
    <div class="footer-inner">
      <p>&copy; 2026 TechPulse Blog. All rights reserved.</p>
      <nav class="footer-nav">
        <a href="${baseUrl}/?session=${sessionId}">Home</a>
        <a href="${baseUrl}/auth/login?session=${sessionId}">Account</a>
        <a href="${baseUrl}/verify/footer-${sessionId}?session=${sessionId}">Verify</a>
      </nav>
      ${nextPayload()}
    </div>
  </footer>
</body>
</html>`;
}
