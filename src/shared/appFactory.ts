import type express from "express";
import type { BootstrapService } from "./BootstrapService";

export interface RunAppOptions {
  /** Port to listen on. */
  port: number;
  /** The already created Express app instance. */
  app: express.Express;
  /** Bootstrap service: onApplicationBootstrap() runs before listen, onApplicationShutDown() runs on shutdown. */
  bootstrapService?: BootstrapService;
  /** Run after app is created, before listen (e.g. mount Swagger). */
  mount?: (app: express.Express) => void;
  /** Optional custom startup message. */
  startupMessage?: (port: number) => string;
}

const defaultStartupMessage = (port: number): string =>
  `Server listening on http://localhost:${port}`;

/**
 * Runs the given Express app: applies bootstrapService, optional mount,
 * starts the HTTP server, and wires graceful shutdown.
 */
export async function runApp(options: RunAppOptions): Promise<void> {
  const { port, app, bootstrapService, mount, startupMessage } = options;

  if (bootstrapService) {
    const result = await bootstrapService.onApplicationBootstrap();
    if (result.locals) {
      Object.assign(app.locals, result.locals);
    }
  }

  if (mount) {
    mount(app);
  }

  const server = app.listen(port, () => {
    const message = startupMessage ?? defaultStartupMessage;
    console.log(message(port));
  });

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Use a different port or stop the other process.`,
      );
      process.exit(1);
    }
    throw err;
  });

  const shutdown = async () => {
    if (bootstrapService) await bootstrapService.onApplicationShutDown();
    server.close(() => process.exit(0));
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}
