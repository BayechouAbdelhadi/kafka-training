<template>
  <SlideFrame type="content">
    <template #title>Offsets: Where They Live and How to Commit Them</template>
    <template #body>
      <ul>
        <li><strong>Where:</strong> By default, Kafka stores consumer offsets in the internal topic <code>__consumer_offsets</code>, so consumers can resume from their last position after a restart.</li>
        <li><strong>Automatic commit</strong> (<code>enable.auto.commit=true</code>): Kafka commits at intervals. <em>Upside:</em> Simple. <em>Downside:</em> If the consumer crashes before the next commit, you risk losing or duplicating work.</li>
        <li><strong>Manual commit</strong> (<code>enable.auto.commit=false</code>): Your code calls <code>commitSync()</code> or <code>commitAsync()</code> after processing. <em>Upside:</em> You control when to commit (e.g. only after work is done). <em>Downside:</em> A bit more code.</li>
      </ul>
      <p><strong>In practice:</strong> For production, manual commit is usually preferred — commit only after you've successfully processed the messages (the pattern for at-least-once processing).</p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
</script>
