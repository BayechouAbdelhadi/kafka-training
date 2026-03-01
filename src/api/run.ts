import swaggerUi from "swagger-ui-express";
import { config } from "../shared/config.js";
import { createApp } from "./controller.js";

const swaggerDoc = {
  openapi: "3.0.0",
  info: { title: "Bottle Supervision API", version: "1.0.0" },
  paths: {
    "/bottles": {
      get: {
        summary: "List all bottles",
        responses: { "200": { description: "List of bottle states" } },
      },
    },
    "/bottles/{bottleId}": {
      get: {
        summary: "Get bottle by ID",
        parameters: [{ name: "bottleId", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Bottle state" }, "404": { description: "Not found" } },
      },
    },
    "/bottles/status/{status}": {
      get: {
        summary: "List bottles by status",
        parameters: [
          {
            name: "status",
            in: "path",
            required: true,
            schema: { type: "string", enum: ["detected", "valid", "to_reject", "rejected"] },
          },
        ],
        responses: { "200": { description: "List of bottle states" } },
      },
    },
    "/stats": {
      get: {
        summary: "Counts by status",
        responses: { "200": { description: "Counts" } },
      },
    },
  },
};

const app = createApp();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const port = config.ports.api;
const server = app.listen(port, () => {
  console.log(`REST API listening on http://localhost:${port}; Swagger at http://localhost:${port}/api-docs`);
});
server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Stop the other process or set API_PORT to a different port.`);
    process.exit(1);
  }
  throw err;
});
