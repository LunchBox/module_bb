<script setup>
import { ref } from "vue";
const props = defineProps({
  tabs: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const activeTab = ref(props.modelValue);

const selectTab = (tabName) => {
  activeTab.value = tabName;
  emit("update:modelValue", tabName);
};
</script>

<template>
  <div>
    <div class="tab-titles">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab.id)"
        :class="{ active: tab.id === activeTab }"
        class="tab-title"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="tab-content">
      <slot :activeTab="activeTab" />
    </div>
  </div>
</template>

<style scoped>
.tab-titles {
  display: flex;
  border-bottom: 1px solid #ccc;
}
.tab-title {
  padding: 10px;
  cursor: pointer;
}
.tab-title.active {
  font-weight: bold;
  border-bottom: 2px solid blue;
}
.tab-content {
  padding: 10px;
}
</style>
