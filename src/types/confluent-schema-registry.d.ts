declare module "@kafkajs/confluent-schema-registry" {
  export enum SchemaType {
    AVRO = "AVRO",
    JSON = "JSON",
    PROTOBUF = "PROTOBUF",
  }

  export interface SchemaRegistryOptions {
    host: string;
  }

  export interface RegisterSchemaOptions {
    subject?: string;
  }

  export interface RegisteredSchema {
    id: number;
  }

  export class SchemaRegistry {
    constructor(options: SchemaRegistryOptions);

    register(
      schema: { type: SchemaType; schema: unknown },
      options?: RegisterSchemaOptions,
    ): Promise<RegisteredSchema>;

    encode(id: number, payload: unknown): Promise<Buffer>;

    decode(buffer: Buffer): Promise<unknown>;
  }

  export function readAVSC(path: string): unknown;
}

