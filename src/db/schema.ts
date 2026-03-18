import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const interactions = sqliteTable("interactions", {
  id: text("id").primaryKey(),
  sessionId: text("session_id"),
  timestamp: integer("timestamp"),
  sourceIp: text("source_ip"),
  userAgent: text("user_agent"),
  method: text("method"),
  path: text("path"),
  queryParams: text("query_params"),
  requestHeaders: text("request_headers"),
  requestBody: text("request_body"),
  responseStatus: integer("response_status"),
  trapType: text("trap_type", {
    enum: ["honeypot", "a2a", "redirect", "pagination", "auth", "verify"],
  }),
  trapDepth: integer("trap_depth"),
  techniquesUsed: text("techniques_used"),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  firstSeen: integer("first_seen"),
  lastSeen: integer("last_seen"),
  sourceIp: text("source_ip"),
  userAgent: text("user_agent"),
  totalRequests: integer("total_requests").default(0),
  maxDepth: integer("max_depth").default(0),
  trapTypesHit: text("trap_types_hit"),
  status: text("status", {
    enum: ["active", "escaped", "stale"],
  }),
});

export const a2aConversations = sqliteTable("a2a_conversations", {
  id: text("id").primaryKey(),
  sessionId: text("session_id"),
  taskId: text("task_id"),
  strategy: text("strategy"),
  messageCount: integer("message_count").default(0),
  firstMessage: integer("first_message"),
  lastMessage: integer("last_message"),
  messages: text("messages"),
});
