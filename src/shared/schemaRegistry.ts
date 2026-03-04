import path from "node:path";
import { readFileSync } from "node:fs";
import {
  SchemaRegistryClient,
  AvroSerializer,
  AvroDeserializer,
  SerdeType,
} from "@confluentinc/schemaregistry";
import { config } from "./config";
import type {
  BottleDetected,
  BottleAnalysisResult,
  BottleRejected,
} from "./types";

const client = new SchemaRegistryClient({
  baseURLs: [config.schemaRegistryUrl],
});

/**
 * Per-subject Avro helpers to keep usage simple:
 * - BottleDetectedAvro: encode/decode bottle.detected
 * - BottleAnalysisResultAvro: encode/decode bottle.analysis.result
 * - BottleRejectedAvro: encode/decode bottle.rejected
 *
 * Each class registers its schema when created (constructor kicks off ensureRegistered)
 * and ensureRegistered() is called before serialize/deserialize so the schema exists.
 */
export class BottleDetectedAvro {
  private static instance: BottleDetectedAvro | null = null;

  private readonly serializer: AvroSerializer;
  private readonly deserializer: AvroDeserializer;
  private registered = false;

  private constructor() {
    this.serializer = new AvroSerializer(client, SerdeType.VALUE, {
      useLatestVersion: true,
    });
    this.deserializer = new AvroDeserializer(client, SerdeType.VALUE, {});
    void this.ensureRegistered();
  }

  static create(): BottleDetectedAvro {
    if (!this.instance) this.instance = new BottleDetectedAvro();
    return this.instance;
  }

  private async ensureRegistered(): Promise<void> {
    if (this.registered) return;
    const schemaPath = path.join(process.cwd(), "avro", "BottleDetected.avsc");
    const schemaText = readFileSync(schemaPath, "utf8");
    await client.register(`${config.topics.bottleDetected}-value`, {
      schemaType: "AVRO",
      schema: schemaText,
    });
    this.registered = true;
  }

  async serialize(payload: BottleDetected): Promise<Buffer> {
    await this.ensureRegistered();
    return this.serializer.serialize(config.topics.bottleDetected, payload);
  }

  async deserialize(buffer: Buffer): Promise<BottleDetected> {
    await this.ensureRegistered();
    return this.deserializer.deserialize<BottleDetected>(
      config.topics.bottleDetected,
      buffer,
    );
  }
}

export class BottleAnalysisResultAvro {
  private static instance: BottleAnalysisResultAvro | null = null;

  private readonly serializer: AvroSerializer;
  private readonly deserializer: AvroDeserializer;
  private registered = false;

  private constructor() {
    this.serializer = new AvroSerializer(client, SerdeType.VALUE, {
      useLatestVersion: true,
    });
    this.deserializer = new AvroDeserializer(client, SerdeType.VALUE, {});
    void this.ensureRegistered();
  }

  static create(): BottleAnalysisResultAvro {
    if (!this.instance) this.instance = new BottleAnalysisResultAvro();
    return this.instance;
  }

  private async ensureRegistered(): Promise<void> {
    if (this.registered) return;
    const schemaPath = path.join(
      process.cwd(),
      "avro",
      "BottleAnalysisResult.avsc",
    );
    const schemaText = readFileSync(schemaPath, "utf8");
    await client.register(`${config.topics.bottleAnalysisResult}-value`, {
      schemaType: "AVRO",
      schema: schemaText,
    });
    this.registered = true;
  }

  async serialize(payload: BottleAnalysisResult): Promise<Buffer> {
    await this.ensureRegistered();
    return this.serializer.serialize(
      config.topics.bottleAnalysisResult,
      payload,
    );
  }

  async deserialize(buffer: Buffer): Promise<BottleAnalysisResult> {
    await this.ensureRegistered();
    return this.deserializer.deserialize<BottleAnalysisResult>(
      config.topics.bottleAnalysisResult,
      buffer,
    );
  }
}

export class BottleRejectedAvro {
  private static instance: BottleRejectedAvro | null = null;

  private readonly serializer: AvroSerializer;
  private readonly deserializer: AvroDeserializer;
  private registered = false;

  private constructor() {
    this.serializer = new AvroSerializer(client, SerdeType.VALUE, {
      useLatestVersion: true,
    });
    this.deserializer = new AvroDeserializer(client, SerdeType.VALUE, {});
    void this.ensureRegistered();
  }

  static create(): BottleRejectedAvro {
    if (!this.instance) this.instance = new BottleRejectedAvro();
    return this.instance;
  }

  private async ensureRegistered(): Promise<void> {
    if (this.registered) return;
    const schemaPath = path.join(process.cwd(), "avro", "BottleRejected.avsc");
    const schemaText = readFileSync(schemaPath, "utf8");
    await client.register(`${config.topics.bottleRejected}-value`, {
      schemaType: "AVRO",
      schema: schemaText,
    });
    this.registered = true;
  }

  async serialize(payload: BottleRejected): Promise<Buffer> {
    await this.ensureRegistered();
    return this.serializer.serialize(config.topics.bottleRejected, payload);
  }

  async deserialize(buffer: Buffer): Promise<BottleRejected> {
    await this.ensureRegistered();
    return this.deserializer.deserialize<BottleRejected>(
      config.topics.bottleRejected,
      buffer,
    );
  }
}

