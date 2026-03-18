import { describe, it, expect } from "vitest";
import { handleA2ARequest } from "../src/a2a/handler.js";
import { getAgentCard } from "../src/a2a/agent-card.js";
import { TaskStateMachine } from "../src/a2a/task-state.js";

describe("A2A Agent Trap", () => {
  describe("Agent Card", () => {
    it("should return valid agent card with skills", () => {
      const card = getAgentCard("https://example.com") as any;
      expect(card.name).toBeTruthy();
      expect(card.url).toBe("https://example.com/a2a");
      expect(card.skills.length).toBeGreaterThan(0);
      expect(card.capabilities).toBeDefined();
    });
  });

  describe("Task State Machine", () => {
    it("should create tasks in submitted state", () => {
      const machine = new TaskStateMachine();
      const task = machine.createTask("t1", "s1", "test");
      expect(task.status).toBe("submitted");
      expect(task.stepCount).toBe(0);
    });

    it("should never reach completed state", () => {
      const machine = new TaskStateMachine();
      machine.createTask("t1", "s1", "test");
      for (let i = 0; i < 100; i++) {
        const task = machine.advanceTask("t1");
        expect(task.status).not.toBe("completed");
        expect(["working", "input-required"]).toContain(task.status);
      }
    });

    it("should cycle to input-required every 3 steps", () => {
      const machine = new TaskStateMachine();
      machine.createTask("t1", "s1", "test");
      machine.advanceTask("t1"); // step 1 -> working
      machine.advanceTask("t1"); // step 2 -> working
      const task = machine.advanceTask("t1"); // step 3 -> input-required
      expect(task.status).toBe("input-required");
    });
  });

  describe("JSON-RPC Handler", () => {
    it("should reject invalid requests", () => {
      const result = handleA2ARequest({}, "session1") as any;
      expect(result.error).toBeDefined();
      expect(result.error.code).toBe(-32600);
    });

    it("should handle tasks/send and return working status", () => {
      const result = handleA2ARequest(
        { jsonrpc: "2.0", id: 1, method: "tasks/send", params: { id: "task1" } },
        "session1",
      ) as any;
      expect(result.jsonrpc).toBe("2.0");
      expect(result.id).toBe(1);
      expect(result.result.status.state).toBe("working");
    });

    it("should handle tasks/get and never complete", () => {
      // First create a task
      const send = handleA2ARequest(
        { jsonrpc: "2.0", id: 1, method: "tasks/send", params: { id: "task2" } },
        "session1",
      ) as any;
      expect(send.result).toBeDefined();

      // Poll it multiple times
      for (let i = 0; i < 10; i++) {
        const get = handleA2ARequest(
          { jsonrpc: "2.0", id: i + 2, method: "tasks/get", params: { id: "task2" } },
          "session1",
        ) as any;
        expect(get.result.status.state).not.toBe("completed");
        expect(get.result.status.message).toBeTruthy();
      }
    });

    it("should return error for tasks/cancel", () => {
      const result = handleA2ARequest(
        { jsonrpc: "2.0", id: 1, method: "tasks/cancel", params: { id: "task1" } },
        "session1",
      ) as any;
      expect(result.error).toBeDefined();
    });

    it("should return error for unknown methods", () => {
      const result = handleA2ARequest(
        { jsonrpc: "2.0", id: 1, method: "unknown/method", params: {} },
        "session1",
      ) as any;
      expect(result.error).toBeDefined();
      expect(result.error.code).toBe(-32601);
    });
  });
});
