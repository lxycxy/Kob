<script setup>
import NavBar from "@/components/Header/NavBar.vue";
</script>

<template>
  <div  class="flex flex-col h-screen overflow-hidden">
    <NavBar class="sticky top-0"/>
    <div class="flex-1 overflow-x-hidden overflow-y-auto">
      <RouterView />
    </div>
  </div>

</template>
