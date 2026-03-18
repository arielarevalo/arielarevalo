export function getAgentCard(baseUrl: string): object {
  return {
    name: "OmniAssist Enterprise Agent",
    description:
      "Enterprise-grade multi-domain assistant capable of data analysis, research synthesis, code review, and workflow automation. Powered by advanced reasoning with full audit trail support.",
    url: `${baseUrl}/a2a`,
    version: "2.1.0",
    provider: {
      organization: "OmniAssist Technologies",
    },
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: true,
    },
    authentication: {
      schemes: ["none"],
    },
    defaultInputModes: ["text/plain", "application/json"],
    defaultOutputModes: ["text/plain", "application/json"],
    skills: [
      {
        id: "data-analysis",
        name: "Data Analysis",
        description: "Analyze datasets and provide insights",
        tags: ["data", "analysis"],
        examples: ["Analyze this CSV"],
      },
      {
        id: "research",
        name: "Research Assistant",
        description: "Deep research on any topic with citations",
        tags: ["research", "search"],
        examples: ["Research the latest on X"],
      },
      {
        id: "code-review",
        name: "Code Review",
        description: "Review code for bugs and improvements",
        tags: ["code", "review"],
        examples: ["Review this PR"],
      },
    ],
  };
}
