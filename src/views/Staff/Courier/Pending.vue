<template>
  <div class="courier-pending">
    <header>
      <h1>Pending Packages</h1>
    </header>

    <Tabs :tabs="tabs" v-model:activeTab="activeTab" />

    <div v-if="activeTab === 'pickup'" class="pickup-tab">
      <div class="package-list">
        <div
          v-for="pkg in pendingPickupPackages"
          :key="pkg.id"
          class="package-item"
        >
          <input
            type="checkbox"
            :id="`package-${pkg.id}`"
            v-model="selectedPackages"
            :value="pkg.id"
          />
          <PackageCard :package="pkg" />
        </div>
      </div>

      <div class="actions">
        <div class="selection-info">
          <span>{{ selectedPackages.length }} selected</span>
          <label>
            <input
              type="checkbox"
              v-model="selectAll"
              @change="toggleSelectAll"
            />
            Select All
          </label>
        </div>
        <button
          @click="pickupSelected"
          :disabled="selectedPackages.length === 0 || isLoading"
        >
          {{ isLoading ? "Processing..." : "Pickup" }}
        </button>
      </div>
    </div>

    <div v-else class="delivery-tab">
      <!-- 待派送包裹类似实现 -->
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Tabs from "@/components/Staff/Courier/Tabs.vue";
import PackageCard from "@/components/Staff/Courier/PackageCard.vue";
import { usePackages } from "@/composables/usePackages";

const { getPendingPickupPackages, pickupPackages, isLoading, error } =
  usePackages();

const tabs = [
  { id: "pickup", label: "Pending Pickup" },
  { id: "delivery", label: "Pending Delivery" },
];
const activeTab = ref("pickup");
const pendingPickupPackages = ref([]);
const selectedPackages = ref([]);
const selectAll = ref(false);

onMounted(async () => {
  try {
    pendingPickupPackages.value = await getPendingPickupPackages();
  } catch (err) {
    console.error(err);
  }
});

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedPackages.value = pendingPickupPackages.value.map((pkg) => pkg.id);
  } else {
    selectedPackages.value = [];
  }
};

const pickupSelected = async () => {
  try {
    await pickupPackages(selectedPackages.value);
    pendingPickupPackages.value = pendingPickupPackages.value.filter(
      (pkg) => !selectedPackages.value.includes(pkg.id)
    );
    selectedPackages.value = [];
    selectAll.value = false;
  } catch (err) {
    console.error(err);
  }
};
</script>

<style scoped>
/* 样式代码 */
</style>
