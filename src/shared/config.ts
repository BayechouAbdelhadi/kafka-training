function port(key: string, defaultVal: number): number {
  return Number(process.env[key] ?? String(defaultVal));
}

export const config = {
  kafka: {
    // Host: localhost (brokers advertise EXTERNAL localhost in docker-compose). From inside Docker use kafka-1:9092,...
    bootstrapServers: process.env.KAFKA_BOOTSTRAP_SERVERS ?? "localhost:9092,localhost:9094,localhost:9095,localhost:9096",
    consumerGroups: {
      automation: "automation",
      tracker: "bottle-tracker",
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
