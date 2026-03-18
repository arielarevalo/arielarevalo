import { drizzle } from "drizzle-orm/d1";
import { desc, sql } from "drizzle-orm";
import { interactions, sessions, a2aConversations } from "../db/schema.js";

export async function renderDashboard(db: D1Database): Promise<string> {
  const orm = drizzle(db);

  const [recentInteractions, activeSessions, recentA2A, stats] = await Promise.all([
    orm
      .select()
      .from(interactions)
      .orderBy(desc(interactions.timestamp))
      .limit(50),
    orm
      .select()
      .from(sessions)
      .orderBy(desc(sessions.lastSeen))
      .limit(20),
    orm
      .select()
      .from(a2aConversations)
      .orderBy(desc(a2aConversations.lastMessage))
      .limit(20),
    orm
      .select({
        totalInteractions: sql<number>`count(*)`,
        uniqueSessions: sql<number>`count(distinct ${interactions.sessionId})`,
        maxDepth: sql<number>`max(${interactions.trapDepth})`,
      })
      .from(interactions),
  ]);

  const s = stats[0] ?? { totalInteractions: 0, uniqueSessions: 0, maxDepth: 0 };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Flypaper Dashboard</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, monospace; background:#0d1117; color:#c9d1d9; padding:1rem; }
  h1 { color:#58a6ff; margin-bottom:1rem; }
  h2 { color:#58a6ff; margin:1.5rem 0 0.5rem; font-size:1.1rem; }
  .stats { display:flex; gap:1rem; margin-bottom:1rem; flex-wrap:wrap; }
  .stat { background:#161b22; border:1px solid #30363d; border-radius:6px; padding:1rem; min-width:150px; }
  .stat .value { font-size:2rem; color:#58a6ff; font-weight:bold; }
  .stat .label { color:#8b949e; font-size:0.85rem; }
  table { width:100%; border-collapse:collapse; margin-top:0.5rem; }
  th, td { padding:0.4rem 0.6rem; text-align:left; border-bottom:1px solid #21262d; font-size:0.85rem; }
  th { color:#8b949e; font-weight:600; }
  td { color:#c9d1d9; }
  .trap-type { padding:0.15rem 0.4rem; border-radius:3px; font-size:0.75rem; font-weight:600; }
  .trap-honeypot { background:#1f3d1f; color:#3fb950; }
  .trap-a2a { background:#1f2d3d; color:#58a6ff; }
  .trap-pagination { background:#3d2d1f; color:#d29922; }
  .trap-auth { background:#3d1f2d; color:#f85149; }
  .trap-verify { background:#2d1f3d; color:#bc8cff; }
  .status-active { color:#3fb950; }
  .status-stale { color:#8b949e; }
  .refresh { color:#58a6ff; text-decoration:none; float:right; }
</style>
</head>
<body>
<h1>Flypaper Dashboard <a class="refresh" href="">Refresh</a></h1>

<div class="stats">
  <div class="stat"><div class="value">${s.totalInteractions}</div><div class="label">Total Interactions</div></div>
  <div class="stat"><div class="value">${s.uniqueSessions}</div><div class="label">Unique Sessions</div></div>
  <div class="stat"><div class="value">${s.maxDepth ?? 0}</div><div class="label">Max Trap Depth</div></div>
  <div class="stat"><div class="value">${activeSessions.filter((s) => s.status === "active").length}</div><div class="label">Active Sessions</div></div>
</div>

<h2>Active Sessions</h2>
<table>
<tr><th>Session ID</th><th>User Agent</th><th>Requests</th><th>Max Depth</th><th>Traps Hit</th><th>Status</th><th>Last Seen</th></tr>
${activeSessions
  .map(
    (s) => `<tr>
  <td>${s.id.slice(0, 12)}...</td>
  <td>${escapeHtml((s.userAgent ?? "").slice(0, 40))}</td>
  <td>${s.totalRequests}</td>
  <td>${s.maxDepth}</td>
  <td>${s.trapTypesHit ?? "[]"}</td>
  <td class="status-${s.status}">${s.status}</td>
  <td>${s.lastSeen ? new Date(s.lastSeen).toISOString().slice(11, 19) : "-"}</td>
</tr>`,
  )
  .join("")}
</table>

<h2>Recent Interactions</h2>
<table>
<tr><th>Time</th><th>Method</th><th>Path</th><th>Trap</th><th>Depth</th><th>User Agent</th></tr>
${recentInteractions
  .map(
    (i) => `<tr>
  <td>${i.timestamp ? new Date(i.timestamp).toISOString().slice(11, 19) : "-"}</td>
  <td>${i.method}</td>
  <td>${escapeHtml((i.path ?? "").slice(0, 50))}</td>
  <td><span class="trap-type trap-${i.trapType}">${i.trapType ?? "unknown"}</span></td>
  <td>${i.trapDepth ?? 0}</td>
  <td>${escapeHtml((i.userAgent ?? "").slice(0, 30))}</td>
</tr>`,
  )
  .join("")}
</table>

<h2>A2A Conversations</h2>
<table>
<tr><th>Task ID</th><th>Strategy</th><th>Messages</th><th>First</th><th>Last</th></tr>
${recentA2A
  .map(
    (a) => `<tr>
  <td>${(a.taskId ?? "").slice(0, 12)}...</td>
  <td>${a.strategy}</td>
  <td>${a.messageCount}</td>
  <td>${a.firstMessage ? new Date(a.firstMessage).toISOString().slice(11, 19) : "-"}</td>
  <td>${a.lastMessage ? new Date(a.lastMessage).toISOString().slice(11, 19) : "-"}</td>
</tr>`,
  )
  .join("")}
</table>

</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
