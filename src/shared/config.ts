function port(key: string, defaultVal: number): number {
  return Number(process.env[key] ?? String(defaultVal));
}

/** Kafka config aligned with training steps 1–4 (infrastructure, topics, producers, consumers). */
export const config = {
  kafka: {
    // Step 1–2: bootstrap servers (host: localhost when using docker-compose from host).
    bootstrapServers: process.env.KAFKA_BOOTSTRAP_SERVERS ?? "localhost:9092,localhost:9094,localhost:9095,localhost:9096",
    consumerGroups: {
      automation: "automation",
      tracker: "bottle-tracker",
    },
    // Step 3 — Producers: durability (acks=all), idempotence (no duplicates on retry), retries, compression.
    producer: {
      acks: -1 as const, // all in-sync replicas (durability)
      idempotent: true,
      retries: 5,
      initialRetryTime: 100,
      maxRetryTime: 30_000,
      maxInFlightRequests: 5,
      compression: "lz4" as "lz4" | "zstd", // lz4 or zstd; good balance of speed and ratio
    },
    // Step 4 — Consumers: group, session/rebalance timeouts. Start position: pass fromBeginning in subscribe({ topic, fromBeginning }).
    consumer: {
      sessionTimeout: 30_000,
      rebalanceTimeout: 60_000,
      heartbeatInterval: 3_000,
    },
  },
  topics: {
    bottleDetected: "bottle.detected",
    bottleAnalysisResult: "bottle.analysis.result",
    bottleRejected: "bottle.rejected",
  },
  ports: {
    api: port("API_PORT", 3009),
    detector: port("DETECTOR_PORT", 3010),
    analyzerCap: port("ANALYZER_CAP_PORT", 3011),
    analyzerLabel: port("ANALYZER_LABEL_PORT", 3012),
    analyzerShape: port("ANALYZER_SHAPE_PORT", 3013),
    automation: port("AUTOMATION_PORT", 3020),
    tracker: port("TRACKER_PORT", 3030),
  },
} as const;
