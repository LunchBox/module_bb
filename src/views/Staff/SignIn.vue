<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
const { staffSignIn } = useAuth();

const formData = ref({
  email: null,
  password: null,
});

async function onSubmit() {
  const { email, password } = formData.value;
  await staffSignIn(email, password);
}
</script>
<template>
  <div>Staff Sign In view</div>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="formData.email" />
      <input type="password" v-model="formData.password" />
      <button>Sign In</button>
    </form>
  </div>
</template>
