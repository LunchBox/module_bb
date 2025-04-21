<script setup>
import { useAuth } from "@/composables/useAuth";
const { signOut } = useAuth();
</script>

<template>
  <div>
    <div>LOGO</div>
    <div>
      <div>
        <RouterLink to="/">Index</RouterLink>
      </div>
      <div>
        <RouterLink to="/send">Send Packages</RouterLink>
      </div>
      <div>
        <RouterLink to="/mypackages">My Packages</RouterLink>
      </div>
      <hr />
      <div>User's name</div>
      <div>
        <a href="#" @click.prevent="signOut">Logout</a>
      </div>

      <div>
        <RouterLink to="/signin">Sign In</RouterLink>
      </div>
      <div>
        <RouterLink to="/signup">Sign Up</RouterLink>
      </div>
    </div>
  </div>
</template>
