<template>
  <SlideFrame type="content">
    <template #title>Schema compatibility: other variants</template>
    <template #body>
      <p>Beyond <strong>backward</strong>, <strong>forward</strong>, and <strong>full</strong>, Schema Registry supports other compatibility modes:</p>
      <ul>
        <li><strong>Transitive:</strong> Compatibility is checked across the <strong>entire chain</strong> of schema versions, not just between consecutive versions. So if V1 → V2 and V2 → V3 are compatible, then V1 → V3 must also be compatible. Stricter than non-transitive backward/forward.</li>
        <li><strong>None:</strong> No compatibility checking (e.g. for development or when you manage breaking changes yourself).</li>
      </ul>
      <p>In practice, <strong>backward</strong>, <strong>forward</strong>, and <strong>full</strong> (often with <strong>transitive</strong>) cover most needs. Transitive avoids “compatibility by a chain of small steps” that could break a jump from an old to a very new version.</p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
</script>
