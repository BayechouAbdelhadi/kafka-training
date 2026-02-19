<template>
  <SlideFrame type="content">
    <template #title>Backward Compatibility (Detail)</template>
    <template #body>
      <p><strong>Definition:</strong> New schema (Vn) can read old data (Vn-1).</p>
      <p><strong>Typical rules:</strong></p>
      <ul>
        <li><strong>Remove a field</strong> in Vn → Old data may still have it → New schema ignores it ✓</li>
        <li><strong>Add a field with a default</strong> in Vn → Old data doesn't have it → Default is used ✓</li>
      </ul>
      <p><strong>Takeaway:</strong> Lets you <strong>upgrade consumers</strong> and deploy new code that still reads existing data safely. Backward is the most common requirement: new consumer code reading old messages.</p>
    </template>
    <template #image>
      <DiagramBackwardCompat />
    </template>
  </SlideFrame>
</template>

<script setup>
import SlideFrame from '@/components/SlideFrame.vue'
import DiagramBackwardCompat from '@/components/diagrams/DiagramBackwardCompat.vue'
</script>
