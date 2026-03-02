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
