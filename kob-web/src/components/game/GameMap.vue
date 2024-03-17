<script setup>
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {GameMap} from "@/assets/scripts/GameMap.js";
import ResultBoard from "@/view/pk/ResultBoard.vue";

let parent = ref(null);
let canvas = ref(null);
const store = useStore();

onMounted(() => {
  store.commit(
      "updateGameObject",
      new GameMap(canvas.value.getContext('2d'), parent.value, store))
});

</script>

<template>
  <div ref="parent" class="relative w-full h-full flex justify-center items-center">
    <canvas ref="canvas" tabindex="0"></canvas>
    <ResultBoard class="absolute left-3/5 top-1/2" v-if="store.state.pk.loser !== 'none'"/>
  </div>
</template>
