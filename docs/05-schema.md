# Step 5 — Schema (Avro)

**Check out the tag for this step** (when it exists):

```bash
git checkout step-05-schema
```

This step covers **Avro schema** with Kafka: schema creation, evolution, compatibility, serialization with schema storage, and deserialization using the schema. Prerequisite: Step 2 (Topics), Step 3 (Producers), Step 4 (Consumers), and the four-broker cluster. A **Schema Registry** (e.g. Confluent Schema Registry) is typically used to store and serve schemas.

**Copying commands (Docsify):** In Docsify, selecting and copying from code blocks sometimes does not put the command on the clipboard at all. If copy does not work: use the **script** when one is shown, or open the doc or script file in your editor and copy from there, or type the command manually.

---

## What we will build in this step

We implement a **real-life example** to practice Schema Registry and Avro in practice: a **bottle production supervision system** (event-driven, mock-based — no real hardware or AI). It demonstrates schema definition, serialization/deserialization, and event flow end to end.

**Scenario:** A bottle production line is supervised by events. A **detector** (mock) periodically emits “bottle detected” events (bottleId, timestamp, imageUrl). Several **analyzers** (e.g. cap, label, shape — each in its own consumer group) consume those events, run a mock analysis (pass/fail), and publish **analysis results**. An **automation** service consumes analysis results and, when any analysis fails, marks the bottle for rejection and publishes to **bottle.rejected**. A **bottle-tracking** module keeps in-memory state (detected, valid, to_reject, rejected) and a **REST API** (Express, Swagger) exposes bottles, analysis, and statistics.

**Event flow:** Detector → `bottle.detected` → Analyzers (parallel) → `bottle.analysis.result` → Automation → `bottle.rejected`; the tracking module and API reflect the current state.

**Stack:** TypeScript, **Apache Kafka**, **Confluent Kafka JS**, **Schema Registry**, Avro for key/value, Express.js, Swagger, modular monolith (detector, analysis, automation, bottle-tracking, api, kafka, shared). We use JSON/Avro serialization, partition key by bottleId, manual offset commit, and safe rebalance handling. This system is the basis for the schema and Schema Registry exercises in this step.

![Bottle supervision — flow and architecture](../assets/bottle-supervision-flow-architecture.png)

---

## Content to cover

### 1. Why schema with Kafka

- Kafka stores bytes; producer and consumer must agree on format. Schema (e.g. Avro) gives a contract: structure, types, and evolution rules; enables compatibility checks and versioned evolution.

### 2. Avro schema — creation

- **Avro schema**: JSON or .avsc definition; records, fields, types (string, int, long, array, map, union, etc.); required vs optional (union with null); naming (name, namespace).

### 3. Schema storage (Schema Registry)

- **Schema Registry**: central store for schemas; each schema has an ID; producers and consumers resolve schema by subject (e.g. topic-name-key, topic-name-value) and version or ID; schema is stored once, messages reference schema ID (or inline in some setups).

### 4. Serialization with schema

- **Producer**: serialize record using Avro + schema; register schema with Schema Registry (if new); send bytes (often: magic byte + schema ID + Avro-encoded payload); Kafka value (or key) is compact and self-describing for consumers that know the registry.

### 5. Deserialization using the schema

- **Consumer**: read bytes; fetch schema from Schema Registry by ID (or from payload); deserialize Avro payload to object; consumer can use latest schema version for a subject (read compatibility) or a specific version.

### 6. Schema evolution

- **Evolution**: adding fields (with defaults), removing fields, renaming (with aliases), changing types; not all changes are safe for all consumers; evolution rules depend on compatibility mode.

### 7. Compatibility

- **Compatibility modes**: BACKWARD (new schema can read data written by previous schema), FORWARD (old schema can read data written by new schema), FULL (both), NONE; setting per subject or global; why it matters for rolling upgrades and multi-version consumers.

### 8. Key settings and tooling

- Reference: Schema Registry URL; serializer/deserializer config (Kafka Avro serializer/deserializer); subject naming (e.g. &lt;topic&gt;-value); schema registry REST API (register, get by id, get by version, check compatibility).

### 9. Traps and best practices

- Breaking compatibility (e.g. remove required field without FULL compatibility); not setting default for new optional fields in BACKWARD; producer and consumer using incompatible schema versions; forgetting to register schema or wrong subject.

---

## Exercises (titles — what each will cover)

| # | Exercise title | What it will cover |
|---|----------------|--------------------|
| 1 | **Schema creation and registration** | Write an Avro schema (.avsc); register it with Schema Registry for a subject (e.g. topic-value); verify via Registry API. Takeaway: schema as JSON; subject and version in Registry. |
| 2 | **Produce with Avro (serialization and schema storing)** | Produce messages using Avro serializer; schema is stored/fetched from Schema Registry; confirm payload format (magic byte + schema ID + Avro). Takeaway: producer serializes with schema and registers if new. |
| 3 | **Consume with Avro (deserialization using schema)** | Consume messages using Avro deserializer; consumer fetches schema from Registry by ID (from payload) and deserializes. Takeaway: consumer deserializes using schema from Registry. |
| 4 | **Schema evolution and compatibility** | Evolve schema (e.g. add optional field with default); set compatibility (e.g. BACKWARD); produce with new schema, consume with old and new client. Show compatibility check (e.g. register breaking change and see failure). Takeaway: evolution rules and compatibility modes protect consumers. |
| 5 | **Conclusion / summary** | Recap: Avro schema + Schema Registry; serialization stores schema, deserialization uses it; evolution and compatibility for safe upgrades. Optional table: goal → schema/registry choice. |

---

All commands in this step assume you are in the **project root** and the cluster is running. Schema Registry (if run locally) and Kafka bootstrap as in previous steps.
