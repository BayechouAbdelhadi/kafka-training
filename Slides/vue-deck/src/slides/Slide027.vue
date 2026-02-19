<template>
  <SlideFrame type="content">
    <template #title>Schema Compatibility: The Three Types</template>
    <template #body>
      <p>To evolve schemas without breaking producers or consumers:</p>
      <ul>
        <li><strong>Backward:</strong> New schema (Vn) can <strong>read old data</strong> (Vn-1). Safe when <strong>consumers</strong> upgrade first (they can still read current data).</li>
        <li><strong>Forward:</strong> Old schema (Vn-1) can <strong>read new data</strong> (Vn). Safe when <strong>producers</strong> upgrade first (old consumers can still read new messages).</li>
        <li><strong>Full:</strong> Both backward and forward. Safest for environments where upgrade order is unknown.</li>
      </ul>
      <p><strong>Choose</strong> based on who you deploy first — consumers or producers — and whether you need to support mixed versions. <em>Backward = consumer upgrades first; forward = producer upgrades first.</em></p>
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
</script>
