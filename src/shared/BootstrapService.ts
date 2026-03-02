/**
 * Abstract bootstrap service for app startup and shutdown.
 * Each app implements onApplicationBootstrap() (e.g. create Kafka resources, set locals) and onApplicationShutDown() (disconnect on shutdown).
 */
export abstract class BootstrapService {
  /**
   * Run before the server listens. Return locals to attach to app.locals.
   */
  abstract onApplicationBootstrap(): Promise<{
    locals?: Record<string, unknown>;
  }>;

  /**
   * Run on SIGTERM/SIGINT before closing the server (e.g. disconnect Kafka).
   */
  abstract onApplicationShutDown(): Promise<void>;
}
