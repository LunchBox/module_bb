<script setup>
defineProps({
  pkg: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="package-card">
    <div>No: {{ pkg.tracking_number }}</div>
    <div>from {{ pkg.from_address }}, {{ pkg.from_campus }}</div>
    <div>to {{ pkg.to_address }}, {{ pkg.to_campus }}</div>
    <div>
      Sender {{ pkg.sender.firstname }} {{ pkg.sender.lastname }},
      {{ pkg.sender.phone_number }}
    </div>
  </div>
</template>

<style scoped>
/* 样式代码 */
</style>
