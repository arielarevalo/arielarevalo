export interface AppBindings {
  DB: D1Database;
  SESSIONS: KVNamespace;
  DASHBOARD_SECRET: string;
}

export type AppEnv = {
  Bindings: AppBindings;
  Variables: {
    sessionId: string;
    requestId: string;
  };
};
