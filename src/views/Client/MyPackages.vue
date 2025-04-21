<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCampus } from "@/composables/useCampus";
import { usePackages } from "@/composables/usePackages";

const { getAllCampuses } = useCampus();
const { getMyPackages, returnPackage } = usePackages();

const pkgs = ref(null);

async function load() {
  pkgs.value = await getMyPackages();
  console.log(pkgs.value);
}
load();

async function onReturn(pkgId) {
  if (!confirm("are you sure?")) return;
  await returnPackage(pkgId);
}
</script>

<template>
  <div>
    <div>Client My Packages view</div>
    <div>
      <div v-for="pkg in pkgs">
        <div>No: {{ pkg.tracking_number }}</div>
        <div>from {{ pkg.from_address }}, {{ pkg.from_campus }}</div>
        <div>to {{ pkg.to_address }}, {{ pkg.to_campus }}</div>
        <div>
          Recipient: {{ pkg.recipient.name }}, {{ pkg.recipient.phone_number }}
        </div>
        <div>Status: {{ pkg.status }}</div>
        <div>Sent Time: {{ pkg.send_time }}</div>
        <div>
          <button @click="$router.push(`/track/${pkg.tracking_number}`)">
            Track
          </button>
        </div>
        <div>
          <button
            @click.prevent="onReturn(pkg.id)"
            :disabled="pkg.returning === 1"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
