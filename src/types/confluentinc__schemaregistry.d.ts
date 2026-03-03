declare module "@confluentinc/schemaregistry" {
  export enum SerdeType {
    KEY = "KEY",
    VALUE = "VALUE",
  }

  export interface SchemaRegistryClientConfig {
    baseURLs: string[];
  }

  export interface RegisterOptions {
    schemaType: string;
    schema: string;
  }

  export class SchemaRegistryClient {
    constructor(config: SchemaRegistryClientConfig);

    register(subject: string, options: RegisterOptions): Promise<number | { id: number }>;
  }

  export class AvroSerializer {
    constructor(
      client: SchemaRegistryClient,
      serdeType: SerdeType,
      options?: unknown,
    );

    serialize(topic: string, payload: unknown): Promise<Buffer>;
  }

  export class AvroDeserializer {
    constructor(
      client: SchemaRegistryClient,
      serdeType: SerdeType,
      options?: unknown,
    );

    deserialize<T = unknown>(topic: string, buffer: Buffer): Promise<T>;
  }
}

