<template>
  <div class="client-index">
    <Sidebar />

    <Banner :images="bannerImages" />

    <div class="track-form">
      <input
        v-model="trackingNumber"
        type="text"
        placeholder="Enter tracking number"
      />
      <button @click="trackPackage">Track</button>
    </div>

    <div class="actions">
      <button @click="goToSendPackage">Send Package</button>
      <button @click="goToMyPackages">My Packages</button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Banner from "@/components/Client/Banner.vue";
import Sidebar from "@/components/Client/Sidebar.vue";

const router = useRouter();
const trackingNumber = ref("");
const error = ref("");

const bannerImages = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
];

const trackPackage = () => {
  if (!trackingNumber.value.trim()) {
    error.value = "Please enter a tracking number";
    return;
  }
  router.push({
    name: "TrackPackage",
    params: { trackingNumber: trackingNumber.value.trim() },
  });
};

const goToSendPackage = () => {
  router.push({ name: "SendPackage" });
};

const goToMyPackages = () => {
  router.push({ name: "MyPackages" });
};
</script>

<style scoped>
/* 样式代码 */
</style>
