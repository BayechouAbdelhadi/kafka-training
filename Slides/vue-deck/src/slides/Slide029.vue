<template>
  <SlideFrame type="content">
    <template #title>Forward Compatibility (Detail)</template>
    <template #body>
      <p><strong>Definition:</strong> Old schema (Vn-1) can read new data (Vn).</p>
      <p><strong>Typical rules:</strong></p>
      <ul>
        <li><strong>Add a field</strong> in Vn → Old consumer doesn't know it → Ignores it ✓</li>
        <li><strong>Remove a field</strong> in Vn that had a default in Vn-1 → Old schema still has the default → Works ✓</li>
      </ul>
      <p><strong>Takeaway:</strong> Lets you <strong>upgrade producers</strong> and send new shapes without breaking existing consumers. Forward is useful when producers roll out new features before all consumers are updated.</p>
    </template>
    <template #image>
      <DiagramForwardCompat />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramForwardCompat from '@/components/diagrams/DiagramForwardCompat.vue'
</script>
