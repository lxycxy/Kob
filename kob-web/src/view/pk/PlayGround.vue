<template>
  <div class="playground">
    <GameMap />
  </div>

</template>

<script setup>
import GameMap from "@/components/game/GameMap.vue";
</script>

<style scoped>
div.playground {
  width: 60vw;
  height: 70vh;
  margin: 40px auto;
}
</style>