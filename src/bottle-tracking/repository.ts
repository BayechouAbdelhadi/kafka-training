import * as db from "../shared/db";
import type { BottleState } from "../shared/types";

export function getBottle(bottleId: string): BottleState | undefined {
  return db.getBottle(bottleId);
}

export function setBottle(bottleId: string, state: BottleState): void {
  db.setBottle(bottleId, state);
}

export function updateBottle(bottleId: string, update: Partial<BottleState>): void {
  db.updateBottle(bottleId, update);
}

export function getAllBottles(): BottleState[] {
  return db.getAllBottles();
}

export function getBottlesByStatus(status: BottleState["status"]): BottleState[] {
  return db.getBottlesByStatus(status);
}

export function getStats(): { detected: number; valid: number; to_reject: number; rejected: number } {
  const all = db.getAllBottles();
  const counts = { detected: 0, valid: 0, to_reject: 0, rejected: 0 };
  for (const b of all) counts[b.status] += 1;
  return counts;
}
