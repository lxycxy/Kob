<script setup>
import {useStore} from "vuex";
import PlayGround from "@/view/pk/PlayGround.vue";
import MatchGround from "@/view/pk/MatchGround.vue";
import {onMounted, onUnmounted} from "vue";
const store = useStore();
const socketUrl = `ws://localhost:3000/websocket/${store.state.user.token}/`;

store.commit("updateLoser", "none");
store.commit("updateIsRecord", false);
let socket = null;

onMounted(() => {

  store.commit('updateOpponent', {
    username: '我的对手',
    photo: 'https://pixabay.com/zh/vectors/question-mark-icon-symbol-question-909830/',
    rating: "?"
  })

  socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    console.log('connected');
    store.commit("updateSocket", socket);
  }

  socket.onmessage  = (msg) => {
    const data = JSON.parse(msg.data);

    if(data.event === 'start-matching') {

      store.commit("updateOpponent", {
        username:data.opponent_username,
        photo:data.opponent_photo,
      });

      setTimeout(() => {
        store.commit("updateStatus", "playing");
      }, 1000);

      store.commit("updateGame", data.game);

    } else if(data.event === 'move') {
      console.log("move" + data);
      const game = store.state.pk.gameObject;
      const [snake0, snake1] = game.snakes;
      snake0.set_direction(data.a_direction);
      snake1.set_direction(data.b_direction);
    } else if(data.event === 'result') {
      console.log("result" + data);
      const game = store.state.pk.gameObject;
      const [snake0, snake1] = game.snakes;

      if(data.loser === 'all' || data.loser === 'A') {
        snake0.status = 'die';
      }
      if(data.loser === 'all' || data.loser === 'B') {
        snake1.status = 'die';
      }

      store.commit("updateLoser", data.loser);
    }

  }

  socket.onclose = () => {
    console.log("unconnected");
  }
})

onUnmounted(() => {
  socket.close();
  store.commit("updateStatus", "matching")
})
</script>

<template>
  <PlayGround v-if="store.state.pk.status === 'playing' "> </PlayGround>
  <MatchGround v-if="store.state.pk.status === 'matching' "></MatchGround>
  <div class="absolute bottom-1/2 text-4xl font-bold" v-if="store.state.pk.status === 'playing' && parseInt(store.state.user.id) === parseInt($store.state.pk.a_id)">你的蛇左下角</div>
  <div class="absolute bottom-1/2 text-4xl font-bold" v-if="store.state.pk.status === 'playing' && parseInt(store.state.user.id) === parseInt($store.state.pk.b_id)">你的蛇右上角</div>
</template>
