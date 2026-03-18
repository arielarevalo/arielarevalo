import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { interactions, sessions, a2aConversations } from "../db/schema";

export interface InteractionData {
  id: string;
  sessionId: string;
  timestamp: number;
  sourceIp: string;
  userAgent: string;
  method: string;
  path: string;
  queryParams: Record<string, string>;
  requestHeaders: Record<string, string>;
  requestBody: string | null;
  responseStatus: number;
  trapType: "honeypot" | "a2a" | "redirect" | "pagination" | "auth" | "verify";
  trapDepth: number;
  techniquesUsed: string[];
}

export interface SessionData {
  id: string;
  sourceIp: string;
  userAgent: string;
  timestamp: number;
  trapType: string;
  depth: number;
}

export interface A2AMessageData {
  conversationId: string;
  sessionId: string;
  taskId: string;
  strategy: string;
  timestamp: number;
  message: unknown;
}

export async function logInteraction(
  db: D1Database,
  data: InteractionData
): Promise<void> {
  const orm = drizzle(db);
  await orm.insert(interactions).values({
    id: data.id,
    sessionId: data.sessionId,
    timestamp: data.timestamp,
    sourceIp: data.sourceIp,
    userAgent: data.userAgent,
    method: data.method,
    path: data.path,
    queryParams: JSON.stringify(data.queryParams),
    requestHeaders: JSON.stringify(data.requestHeaders),
    requestBody: data.requestBody,
    responseStatus: data.responseStatus,
    trapType: data.trapType,
    trapDepth: data.trapDepth,
    techniquesUsed: JSON.stringify(data.techniquesUsed),
  });
}

export async function upsertSession(
  db: D1Database,
  data: SessionData
): Promise<void> {
  const orm = drizzle(db);
  const existing = await orm
    .select()
    .from(sessions)
    .where(eq(sessions.id, data.id))
    .get();

  if (existing) {
    const trapTypesHit: string[] = JSON.parse(existing.trapTypesHit || "[]");
    if (!trapTypesHit.includes(data.trapType)) {
      trapTypesHit.push(data.trapType);
    }

    await orm
      .update(sessions)
      .set({
        lastSeen: data.timestamp,
        totalRequests: (existing.totalRequests || 0) + 1,
        maxDepth: Math.max(existing.maxDepth || 0, data.depth),
        trapTypesHit: JSON.stringify(trapTypesHit),
        status: "active",
      })
      .where(eq(sessions.id, data.id));
  } else {
    await orm.insert(sessions).values({
      id: data.id,
      firstSeen: data.timestamp,
      lastSeen: data.timestamp,
      sourceIp: data.sourceIp,
      userAgent: data.userAgent,
      totalRequests: 1,
      maxDepth: data.depth,
      trapTypesHit: JSON.stringify([data.trapType]),
      status: "active",
    });
  }
}

export async function logA2AMessage(
  db: D1Database,
  data: A2AMessageData
): Promise<void> {
  const orm = drizzle(db);
  const existing = await orm
    .select()
    .from(a2aConversations)
    .where(eq(a2aConversations.id, data.conversationId))
    .get();

  if (existing) {
    const messages: unknown[] = JSON.parse(existing.messages || "[]");
    messages.push(data.message);

    await orm
      .update(a2aConversations)
      .set({
        messageCount: (existing.messageCount || 0) + 1,
        lastMessage: data.timestamp,
        messages: JSON.stringify(messages),
      })
      .where(eq(a2aConversations.id, data.conversationId));
  } else {
    await orm.insert(a2aConversations).values({
      id: data.conversationId,
      sessionId: data.sessionId,
      taskId: data.taskId,
      strategy: data.strategy,
      messageCount: 1,
      firstMessage: data.timestamp,
      lastMessage: data.timestamp,
      messages: JSON.stringify([data.message]),
    });
  }
}
