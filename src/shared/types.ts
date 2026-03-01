/** Emitted by detector; consumed by analyzers. */
export interface BottleDetected {
  bottleId: string;
  timestamp: string; // ISO
  imageUrl: string;
}

/** Emitted by each analyzer; consumed by automation and tracker. */
export interface BottleAnalysisResult {
  bottleId: string;
  analyzer: "cap" | "label" | "shape";
  passed: boolean;
  timestamp: string;
  details?: string;
}

/** Emitted by automation when bottle is rejected; consumed by tracker. */
export interface BottleRejected {
  bottleId: string;
  reason: string;
  timestamp: string;
}

export type BottleStatus = "detected" | "valid" | "to_reject" | "rejected";

/** In-memory state for one bottle (used by tracker and API). */
export interface BottleState {
  bottleId: string;
  status: BottleStatus;
  detectedAt: string;
  imageUrl?: string;
  analyses: BottleAnalysisResult[];
  rejectedAt?: string;
  rejectReason?: string;
}
