<template>
  <SlideFrame type="content">
    <template #title>Schema Registry</template>
    <template #body>
      <ul>
        <li><strong>Role:</strong> Central place that <strong>stores and serves</strong> message schemas (e.g. Avro, JSON Schema, Protobuf). Producers and consumers fetch the schema (by ID) and use it to serialize/deserialize.</li>
        <li><strong>Benefits:</strong> Producers and consumers <strong>agree on the structure</strong> of data; you can <strong>evolve</strong> schemas over time without breaking existing consumers if you follow compatibility rules.</li>
      </ul>
      <p><strong>Next:</strong> What "evolve without breaking" means — <strong>backward</strong> and <strong>forward</strong> compatibility. Schema Registry is the contract store; compatibility settings are the rules for safe evolution.</p>
    </template>
    <template #image>
      <DiagramSchemaRegistry />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramSchemaRegistry from '@/components/diagrams/DiagramSchemaRegistry.vue'
</script>
