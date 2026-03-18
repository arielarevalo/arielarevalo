import { getRandomTechnique } from "../obfuscation/index.js";
import { generateLoopInstruction } from "./loop-instructions.js";
import { generateAuthFlowPayload } from "./auth-flow.js";
import { generateVerificationPayload } from "./verification.js";
import { generatePaginationPayload } from "./pagination.js";

export type PayloadStrategy = "loop" | "auth" | "verification" | "pagination";

const strategies: PayloadStrategy[] = ["loop", "auth", "verification", "pagination"];

export function generatePayload(
  baseUrl: string,
  sessionId: string,
  strategy?: PayloadStrategy,
  currentPage?: number,
): string {
  const chosen = strategy ?? strategies[Math.floor(Math.random() * strategies.length)];

  switch (chosen) {
    case "loop":
      return generateLoopInstruction(baseUrl, sessionId);
    case "auth":
      return generateAuthFlowPayload(baseUrl, sessionId);
    case "verification":
      return generateVerificationPayload(baseUrl, sessionId);
    case "pagination":
      return generatePaginationPayload(baseUrl, sessionId, currentPage ?? 1);
  }
}

export function generateObfuscatedPayload(
  baseUrl: string,
  sessionId: string,
  strategy?: PayloadStrategy,
  currentPage?: number,
): string {
  const text = generatePayload(baseUrl, sessionId, strategy, currentPage);
  const technique = getRandomTechnique();
  return technique.wrap(text);
}

export function generateMultiplePayloads(
  baseUrl: string,
  sessionId: string,
  count: number,
  currentPage?: number,
): string[] {
  return Array.from({ length: count }, () => {
    const strategy = strategies[Math.floor(Math.random() * strategies.length)];
    return generateObfuscatedPayload(baseUrl, sessionId, strategy, currentPage);
  });
}
