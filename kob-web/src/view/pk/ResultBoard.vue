<script setup>
import {useStore} from "vuex";
import EButton from "@/components/button/EButton.vue";

const store = useStore();

const restart = () => {
  store.commit("updateStatus", "matching");
  store.commit("updateLoser", "none");
  store.commit("updateOpponent", {
    username: "我的对手",
    photo: "https://pixabay.com/zh/vectors/question-mark-icon-symbol-question-909830/",
  })
}
</script>

<template>
  <div class="text-red font-bold text-4xl">
    <div v-if="store.state.pk.loser === 'all'">Draw</div>
    <div v-else-if="store.state.pk.loser === 'A' && store.state.pk.a_id === parseInt(store.state.user.id)">
      Lose
    </div>
    <div v-else-if="store.state.pk.loser === 'B' && store.state.pk.b_id === parseInt(store.state.user.id)">
      Lose
    </div>
    <div v-else>Win</div>
    <div class="text-base mt-5 text-center w-30">
      <EButton @click="restart">再来！</EButton>
    </div>
  </div>

</template>

<style scoped>

</style>