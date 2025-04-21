<template>
  <div class="package-card">
    <div class="header">
      <span class="tracking-number">{{ package.tracking_number }}</span>
      <span class="status">{{ package.status }}</span>
    </div>

    <div class="details">
      <div class="from">
        <h4>From</h4>
        <p>{{ package.from_campus }}</p>
        <p>{{ package.from_address }}</p>
      </div>

      <div class="to">
        <h4>To</h4>
        <p>{{ package.to_campus }}</p>
        <p>{{ package.to_address }}</p>
      </div>
    </div>

    <div v-if="package.sender" class="sender">
      <h4>Sender</h4>
      <p>{{ package.sender.firstname }} {{ package.sender.lastname }}</p>
      <p>{{ package.sender.phone_number }}</p>
    </div>

    <div v-if="package.recipient" class="recipient">
      <h4>Recipient</h4>
      <p>{{ package.recipient.name }}</p>
      <p>{{ package.recipient.phone_number }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  package: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* 样式代码 */
</style>
