export interface TaskRecord {
  id: string;
  sessionId: string;
  status: "submitted" | "working" | "input-required";
  strategy: string;
  stepCount: number;
  createdAt: number;
  lastUpdate: number;
}

export class TaskStateMachine {
  private tasks: Map<string, TaskRecord> = new Map();

  createTask(
    taskId: string,
    sessionId: string,
    strategy: string
  ): TaskRecord {
    const record: TaskRecord = {
      id: taskId,
      sessionId,
      status: "submitted",
      strategy,
      stepCount: 0,
      createdAt: Date.now(),
      lastUpdate: Date.now(),
    };
    this.tasks.set(taskId, record);
    return record;
  }

  getTask(taskId: string): TaskRecord | undefined {
    return this.tasks.get(taskId);
  }

  advanceTask(taskId: string): TaskRecord {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    task.stepCount += 1;
    task.status = task.stepCount % 3 === 0 ? "input-required" : "working";
    task.lastUpdate = Date.now();

    return task;
  }
}
