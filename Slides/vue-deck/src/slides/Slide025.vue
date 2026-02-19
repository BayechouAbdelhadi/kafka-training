<template>
  <SlideFrame type="content">
    <template #title>Serialization and Deserialization</template>
    <template #body>
      <ul>
        <li><strong>Serialization (producer):</strong> Convert your objects (e.g. key string, value JSON) into byte arrays before sending to Kafka. Example: <code>[key, value] → [bytes, bytes]</code></li>
        <li><strong>Deserialization (consumer):</strong> Convert byte arrays back into objects your application can use. Must use the <strong>same format</strong> as the producer. Example: <code>[bytes, bytes] → [key, value]</code></li>
      </ul>
      <p><strong>Common formats:</strong> JSON, Avro, Protobuf. Avro or Protobuf with Schema Registry give compact storage and <strong>schema evolution</strong> (next slides). Mismatched serializers are a classic source of bad data; Schema Registry helps avoid that.</p>
    </template>
    <template #image>
      <DiagramSerialization />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramSerialization from '@/components/diagrams/DiagramSerialization.vue'
</script>
