<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCampus } from "@/composables/useCampus";
import { usePackages } from "@/composables/usePackages";

const { getAllCampuses } = useCampus();
const { sendPackage } = usePackages();

const campuses = ref([]);

const pkg = ref({
  from_campus_id: null,
  from_address: null,
  to_campus_id: null,
  to_address: null,
  recipient_name: null,
  recipient_phone_number: null,
});

async function loadCampuses() {
  campuses.value = await getAllCampuses();
}
loadCampuses();

const router = useRouter();
async function onSubmit() {
  await sendPackage(pkg.value);
  router.push("/send_success");
}
</script>
<template>
  <div>Client Send Packages view</div>
  <form @submit.prevent="onSubmit">
    <div>
      From
      <div>- Campus</div>
      <select v-model="pkg.from_campus_id" required>
        <option v-for="c in campuses" :value="c.id">{{ c.name }}</option>
      </select>
      <div>- Address</div>
      <input type="text" v-model="pkg.from_address" required />
    </div>

    <div>
      To
      <div>- Receiptent Name</div>
      <input type="text" v-model="pkg.recipient_name" required />
      <div>- Phone Number</div>
      <input type="text" v-model="pkg.recipient_phone_number" required />
      <div>- Campus</div>
      <select v-model="pkg.to_campus_id" required>
        <option v-for="c in campuses" :value="c.id">{{ c.name }}</option>
      </select>
      <div>- Address</div>
      <input type="text" v-model="pkg.to_address" required />
    </div>

    <div>
      <button>Send Now</button>
    </div>
  </form>
</template>
