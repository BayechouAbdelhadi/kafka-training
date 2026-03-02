import type express from "express";
import type { BootstrapService } from "./BootstrapService.js";

export interface RunAppOptions {
  /** Port to listen on. */
  port: number;
  /** Returns the Express app (routes, middleware). */
  createApp: () => express.Express;
  /** Bootstrap service: process() runs before listen, cleanUp() runs on shutdown. */
  bootstrapService?: BootstrapService;
  /** Run after createApp, before listen (e.g. mount Swagger). */
  mount?: (app: express.Express) => void;
  /** Message to log when server is listening. */
}


/**
 * Creates the app, runs bootstrapService.process() (optional), mounts extra middleware (optional),
 * starts the server, and registers graceful shutdown (bootstrapService.cleanUp) on SIGTERM/SIGINT.
 */
export async function runApp(options: RunAppOptions): Promise<void> {
  const {
    port,
    createApp,
    bootstrapService,
    mount,
  } = options;

  const app = createApp();

  if (bootstrapService) {
    const result = await bootstrapService.process();
    if (result.locals) {
      Object.assign(app.locals, result.locals);
    }
  }

  if (mount) {
    mount(app);
  }

  const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
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
    if (bootstrapService) await bootstrapService.cleanUp();
    server.close(() => process.exit(0));
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}
