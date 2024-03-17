<script setup>
import NavBar from "@/components/Header/NavBar.vue";
</script>

<template>
  <div class="h-screen overflow-hidden">
    <NavBar class="sticky top-0" />
    <RouterView />
  </div>

</template>
