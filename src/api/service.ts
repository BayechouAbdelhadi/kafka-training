import type { BottleState } from "../shared/types";
import * as repository from "./repository";

export function getAllBottles(): BottleState[] {
  return repository.getAllBottles();
}

export function getBottle(bottleId: string): BottleState | undefined {
  return repository.getBottle(bottleId);
}

export function getBottlesByStatus(status: BottleState["status"]): BottleState[] {
  return repository.getBottlesByStatus(status);
}

export function getStats(): { detected: number; valid: number; to_reject: number; rejected: number } {
  const all = repository.getAllBottles();
  const counts = { detected: 0, valid: 0, to_reject: 0, rejected: 0 };
  for (const b of all) counts[b.status] += 1;
  return counts;
}
