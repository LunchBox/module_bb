<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
const { clientSignUp } = useAuth();

const formData = ref({
  email: null,
  password: null,
  repeat_password: null,
  phone_number: null,
  firstname: null,
  lastname: null,
});

async function onSubmit() {
  await clientSignUp(formData.value);
}
</script>
<template>
  <div>
    <div>Client Sign Up view</div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="formData.email" />
      <input type="password" v-model="formData.password" />
      <input type="password" v-model="formData.repeat_password" />
      <input type="text" v-model="formData.phone_number" />
      <input type="text" v-model="formData.firstname" />
      <input type="text" v-model="formData.lastname" />

      <button>Sign Up</button>
    </form>

    <div>
      Have a account?
      <RouterLink to="/signin">Sign In</RouterLink>
    </div>
  </div>
</template>
