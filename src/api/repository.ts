import * as db from "../shared/db.js";
import type { BottleState } from "../shared/types.js";

export function getAllBottles(): BottleState[] {
  return db.getAllBottles();
}

export function getBottle(bottleId: string): BottleState | undefined {
  return db.getBottle(bottleId);
}

export function getBottlesByStatus(status: BottleState["status"]): BottleState[] {
  return db.getBottlesByStatus(status);
}
