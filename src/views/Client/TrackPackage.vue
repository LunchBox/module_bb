<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { usePackages } from "@/composables/usePackages";

const { getPackageDetails } = usePackages();

const route = useRoute();

const details = ref(null);

async function load() {
  console.log(route.params);
  const data = await getPackageDetails(route.params.trackingNumber);
  console.log(data);
  details.value = data;
}

load();
</script>
<template>
  <div>Client Track Packages view</div>

  <div v-if="details">
    <div>
      Tracking
      {{ details.tracking_number }}
    </div>
    <div>
      {{ details.status }}
      {{ details.from_campus }} -> {{ details.to_campus }}
    </div>
    <div>
      Progress
      <div v-for="prog in details.progress">
        <div>
          {{ prog.status }}
        </div>
        <div>
          {{ prog.datetime }}

          <span v-if="prog.returnning === 1">Returnning</span>
        </div>
      </div>
    </div>
  </div>
</template>
