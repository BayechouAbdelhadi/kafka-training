export abstract class Processor {
  /**
   * Execute the main work of this processor.
   * Optional args allow different processors to use the same method (e.g. detector: process(bottleId?, imageUrl?)).
   */
  abstract process(...args: unknown[]): Promise<unknown>;

  /**
   * Release resources and perform cleanup (called on shutdown).
   */
  abstract cleanUp(): Promise<void>;
}
