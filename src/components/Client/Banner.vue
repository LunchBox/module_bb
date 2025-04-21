<template>
  <div class="banner">
    <div
      class="slides"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="slide"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
    </div>

    <div class="controls">
      <button
        v-for="(_, index) in images"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const currentIndex = ref(0);
let intervalId = null;

const goToSlide = (index) => {
  currentIndex.value = index;
  resetInterval();
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const startInterval = () => {
  intervalId = setInterval(nextSlide, 3000);
};

const resetInterval = () => {
  clearInterval(intervalId);
  startInterval();
};

onMounted(() => {
  startInterval();
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
/* 样式代码 */
</style>
