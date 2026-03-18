const topics = [
  {
    category: "Cloud Computing",
    titles: [
      "Migrating Legacy Workloads to Multi-Cloud Architectures",
      "Cost Optimization Strategies for AWS Lambda at Scale",
      "Building Resilient Microservices with Kubernetes Service Mesh",
      "Serverless vs Containers: Choosing the Right Abstraction",
      "Edge Computing Patterns for Low-Latency Applications",
    ],
  },
  {
    category: "Artificial Intelligence",
    titles: [
      "Fine-Tuning Foundation Models for Domain-Specific Tasks",
      "MLOps Pipelines: From Experiment to Production",
      "Retrieval-Augmented Generation in Enterprise Search",
      "Vector Databases: Benchmarking Pinecone vs Weaviate vs Qdrant",
      "Building Evaluation Frameworks for LLM Applications",
    ],
  },
  {
    category: "DevOps",
    titles: [
      "GitOps with ArgoCD: Declarative Infrastructure at Scale",
      "Observability Beyond Metrics: Distributed Tracing in Practice",
      "Terraform State Management for Large Engineering Teams",
      "Progressive Delivery with Feature Flags and Canary Releases",
      "Platform Engineering: Building Your Internal Developer Portal",
    ],
  },
  {
    category: "Security",
    titles: [
      "Supply Chain Security: Signing and Verifying Container Images",
      "Zero Trust Networking: Moving Beyond the Perimeter",
      "Secrets Management Patterns for Cloud-Native Applications",
      "Runtime Security Monitoring with eBPF",
      "Automated Vulnerability Scanning in CI/CD Pipelines",
    ],
  },
  {
    category: "Backend Engineering",
    titles: [
      "Event-Driven Architecture with Apache Kafka: Beyond the Basics",
      "Database Sharding Strategies for High-Traffic Applications",
      "gRPC vs REST: Making the Right Choice for Your Service Mesh",
      "Caching Strategies That Survive Cache Stampedes",
      "PostgreSQL Performance Tuning for Write-Heavy Workloads",
    ],
  },
  {
    category: "Frontend Engineering",
    titles: [
      "Micro-Frontends in Practice: Module Federation Deep Dive",
      "Web Performance Budgets That Engineering Teams Actually Follow",
      "State Management in 2026: Signals, Stores, and Server State",
      "Accessibility Testing Automation for Component Libraries",
      "Building Design Systems That Scale Across 50+ Teams",
    ],
  },
];

const paragraphs: string[][] = [
  [
    "When organizations first evaluate their migration strategy, the sheer number of options can be overwhelming. The key is to start with a thorough assessment of existing workloads, categorizing them by complexity, dependencies, and business criticality. Teams that skip this phase often find themselves backtracking months into the project.",
    "Our experience with Fortune 500 companies shows that a phased approach yields the best results. Starting with stateless applications and progressively moving toward stateful workloads allows teams to build institutional knowledge while minimizing risk. The tooling ecosystem has matured significantly, with automated discovery capabilities now standard.",
    "One overlooked aspect is the organizational change required alongside technical migration. Engineering teams need updated runbooks, on-call rotations must account for new failure modes, and cost attribution models need redesigning. The most successful migrations treat this as a people problem first and a technology problem second.",
  ],
  [
    "Performance benchmarks consistently show that runtime environment choice dramatically impacts cold start times and throughput. In testing across major cloud providers, latency variations of up to 40% were observed depending on configuration. Memory allocation plays a non-obvious role in CPU allocation on serverless platforms.",
    "The economic model shifts fundamentally when moving to pay-per-invocation pricing. For predictable traffic, cost savings can be substantial, but bursty workloads require careful analysis. Open-source calculators that model costs across usage patterns and pricing tiers have become essential planning tools.",
  ],
  [
    "Modern container orchestration has evolved beyond simple deployment automation. Service mesh technologies add a dedicated infrastructure layer for service-to-service communication, providing mutual TLS, traffic shaping, and fine-grained observability without application code changes.",
    "The operational complexity of running a service mesh should not be underestimated. Each abstraction layer introduces new failure modes and debugging challenges. Teams should evaluate whether automatic retry policies and circuit breaking justify the added complexity for their use case.",
    "In production environments serving millions of requests daily, sidecar proxy overhead is generally acceptable at 1-3ms of latency per hop. The real value comes from consistent observability across services, dramatically reducing mean time to resolution during incidents.",
  ],
  [
    "The machine learning infrastructure landscape has changed dramatically. What once required deep distributed systems expertise is now accessible through managed platforms and standardized APIs. However, the gap between a working prototype and production-ready system remains significant.",
    "Training pipelines must account for data drift, model versioning, and reproducibility from the start. Teams treating these as afterthoughts invariably encounter problems debugging production issues or rolling back models. Well-designed MLOps pipelines make these operations routine.",
  ],
  [
    "Event-driven architectures offer compelling benefits for variable load patterns and loose coupling. Decoupling producers from consumers through message brokers enables independent scaling and adding new consumers without modifying existing code.",
    "The trade-off is increased complexity in understanding system behavior. When requests traverse multiple services through asynchronous messaging, debugging becomes harder. Correlation IDs, structured logging, and distributed tracing are essential operational requirements in event-driven systems.",
    "Exactly-once processing semantics remain one of the hardest distributed systems problems. While some frameworks provide exactly-once guarantees within their context, achieving end-to-end semantics across systems typically requires idempotent consumers and careful deduplication.",
  ],
  [
    "Supply chain attacks have moved from theoretical to practical reality. Recent incidents demonstrated that even well-resourced organizations can be compromised through their software supply chain. Container image signing provides a critical layer of defense ensuring provenance and integrity.",
    "Integrating verification into admission controllers means unsigned or tampered images are rejected before running in your cluster. This shift-left approach catches issues at the earliest point, reducing the blast radius of compromised dependencies.",
  ],
  [
    "The retrieval layer in RAG pipelines is often the quality bottleneck rather than the generative model. Chunking strategies, embedding model selection, and re-ranking algorithms collectively determine whether the system retrieves genuinely relevant context or returns superficially similar but unhelpful passages.",
    "Evaluation frameworks for RAG systems must measure both retrieval precision and generation quality independently. Teams that only evaluate end-to-end output miss opportunities to identify which component is responsible for quality degradation, making systematic improvement nearly impossible.",
    "Production RAG deployments face challenges around document freshness, access control inheritance, and handling queries that span multiple knowledge domains. Solutions like metadata filtering, hybrid search combining dense and sparse retrievers, and query decomposition address these concerns at scale.",
  ],
  [
    "Platform engineering represents the maturation of DevOps principles into a product-oriented discipline. Rather than expecting every development team to become infrastructure experts, platform teams build self-service abstractions that encode organizational best practices into reusable capabilities.",
    "The most effective internal developer platforms start with paved paths rather than paved roads. Instead of mandating a single way to deploy services, successful platforms offer well-supported defaults that teams can adopt incrementally, with escape hatches for teams with genuinely unique requirements.",
    "Measuring platform team success requires different metrics than traditional infrastructure teams. Developer satisfaction surveys, time-to-first-deployment for new services, and the ratio of self-service to ticket-based requests provide a more accurate picture of platform value than uptime or cost metrics alone.",
  ],
  [
    "Zero trust networking fundamentally rejects the assumption that internal network traffic is inherently trustworthy. Every request must be authenticated and authorized regardless of its origin, which requires rethinking network architecture from identity-based access control to micro-segmentation.",
    "Implementing zero trust incrementally is critical for organizations with existing infrastructure. Starting with strong identity for service-to-service communication using mutual TLS and gradually adding policy enforcement at service boundaries allows teams to build confidence without disrupting production traffic.",
  ],
  [
    "Database sharding becomes necessary when vertical scaling reaches its limits, but the decision should be deferred as long as practical. Premature sharding introduces complexity in cross-shard queries, distributed transactions, and operational procedures that may not be justified by current scale requirements.",
    "Choosing the right shard key is the most consequential decision in a sharding implementation. Keys that create hot spots or require frequent cross-shard operations negate many benefits of sharding. Analysis of query patterns and data distribution must drive this decision rather than intuition.",
    "Resharding operations on live production databases remain one of the most challenging operational tasks in backend engineering. Automated tooling has improved, but teams should plan for resharding from the initial implementation by using logical sharding with consistent hashing rather than range-based approaches.",
  ],
];

const authors = [
  "Sarah Chen",
  "Marcus Rodriguez",
  "Priya Patel",
  "James O'Brien",
  "Aisha Mohammed",
  "David Kim",
  "Elena Vasquez",
  "Ryan Nakamura",
  "Fatima Al-Rashid",
  "Thomas Andersen",
];

function seededIndex(seed: number, max: number): number {
  const x = Math.sin(seed) * 10000;
  return Math.abs(Math.floor(x)) % max;
}

function generateDate(page: number, postIndex: number): string {
  const baseTs = 1704067200000;
  const dayOffset = (page - 1) * 7 + postIndex * 2;
  const date = new Date(baseTs + dayOffset * 86400000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateBlogContent(page: number): {
  title: string;
  posts: Array<{ title: string; date: string; content: string }>;
} {
  const posts: Array<{ title: string; date: string; content: string }> = [];

  for (let i = 0; i < 3; i++) {
    const seed = page * 1000 + i * 137;
    const topicIdx = seededIndex(seed, topics.length);
    const titleIdx = seededIndex(seed + 1, topics[topicIdx].titles.length);
    const bodyIdx = seededIndex(seed + 2, paragraphs.length);
    const authorIdx = seededIndex(seed + 3, authors.length);

    const content = paragraphs[bodyIdx].map((p) => `<p>${p}</p>`).join("\n");

    posts.push({
      title: topics[topicIdx].titles[titleIdx],
      date: `${generateDate(page, i)} &middot; ${authors[authorIdx]}`,
      content,
    });
  }

  return { title: "TechPulse Blog", posts };
}
