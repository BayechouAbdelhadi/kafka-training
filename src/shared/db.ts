import type { BottleState } from "./types.js";

const store = new Map<string, BottleState>();

export function getBottle(bottleId: string): BottleState | undefined {
  return store.get(bottleId);
}

export function setBottle(bottleId: string, state: BottleState): void {
  store.set(bottleId, state);
}

export function updateBottle(bottleId: string, update: Partial<BottleState>): void {
  const existing = store.get(bottleId);
  if (!existing) {
    store.set(bottleId, { ...update, bottleId, status: "detected", detectedAt: "", analyses: [] } as BottleState);
    return;
  }
  store.set(bottleId, { ...existing, ...update });
}

export function getAllBottles(): BottleState[] {
  return Array.from(store.values());
}

export function getBottlesByStatus(status: BottleState["status"]): BottleState[] {
  return getAllBottles().filter((b) => b.status === status);
}
