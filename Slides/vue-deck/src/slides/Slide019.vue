<template>
  <SlideFrame type="content">
    <template #title>Producer: serialization, partitioning, batching, retries, acks, idempotency</template>
    <template #body>
      <div class="producer-cards">
        <div class="card">
          <div class="card-title">Serialization</div>
          <p>The broker stores <strong>only bytes</strong>. The producer converts keys and values (e.g. JSON, Avro, Protobuf) into byte arrays before sending. Consumers deserialize using the same format.</p>
        </div>
        <div class="card">
          <div class="card-title">Partitioning</div>
          <p>Producer (or Kafka) decides which partition: <strong>round-robin</strong> for null key; <strong>hash(key)</strong> so same key → same partition → ordering per key.</p>
        </div>
        <div class="card">
          <div class="card-title">Batching</div>
          <p>Records are grouped and sent in <strong>batches</strong> to reduce round-trips and increase throughput. Trade latency for throughput (<code>linger.ms</code>, <code>batch.size</code>).</p>
        </div>
        <div class="card">
          <div class="card-title">Retries</div>
          <p>On failure (leader unavailable, timeout), the producer can <strong>retry</strong>. With idempotency enabled, retrying the same batch does not create duplicate records.</p>
        </div>
        <div class="card">
          <div class="card-title">Acknowledgements (acks)</div>
          <p><strong>acks=0</strong> fire-and-forget; <strong>acks=1</strong> leader only; <strong>acks=all</strong> leader + in-sync replicas. For durability use <strong>acks=all</strong>.</p>
        </div>
        <div class="card">
          <div class="card-title">Idempotency</div>
          <p>When enabled, the producer assigns sequence numbers so the broker can <strong>deduplicate</strong> retried batches. Prevents duplicates on retry; foundation for exactly-once.</p>
        </div>
      </div>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
</script>

<style scoped>
.producer-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
}

.card {
  background: var(--navy-mid);
  border: 1px solid var(--gray-light);
  border-radius: var(--radius);
  padding: 1rem;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--amber-light);
  margin-bottom: 0.5rem;
}

.card p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--gray-light);
}

.card p strong {
  color: var(--white);
}

.card code {
  font-size: 0.8em;
  color: var(--amber);
  background: var(--navy);
  padding: 0.1em 0.35em;
  border-radius: 4px;
}

@media (max-width: 900px) {
  .producer-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
