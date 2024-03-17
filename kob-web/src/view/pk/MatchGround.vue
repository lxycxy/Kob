<script setup>
import {useStore} from "vuex";
import {ref} from "vue";
import EButton from "@/components/button/EButton.vue";
import $ from 'jquery'
const store = useStore()
const buttonInfo = ref('开始匹配');

const changeState = () => {
  if (buttonInfo.value === '开始匹配') {
    buttonInfo.value = '取消匹配'
    store.state.pk.socket.send(JSON.stringify({
      event:'start-matching',
      bot_id: selectedBot.value,
    }))
  } else {
    buttonInfo.value = '开始匹配'
    store.state.pk.socket.send(JSON.stringify({
      event:'stop-matching',
    }));
  }
}

let bots = ref([{
  label: '亲自出马',
  value: '-1'
}]);
let selectedBot = ref("-1");


const getBots = () => {
  $.ajax({
    url: "http://localhost:3000/api/user/bot/getlist/",
    type: "get",
    headers: {
      Authorization: "Bearer " + store.state.user.token,
    },
    success(resp) {
      for (let item of resp) {
        bots.value.push({
          label: item.title,
          value: item.id
        })
      }
    }
  })
}

getBots();


</script>

<template>
  <div class="rounded-lg bg-white m-10 flex dark:bg-boxdark dark:text-whiten">
    <div class="flex p-3 gap-3 flex-col items-center w-1/2 border-r border-r-slate-300">
      <img class="rounded-full" :src="store.state.user.photo" width="64" alt="avator" />
      <span class="text-2xl font-bold">{{store.state.user.username}}</span>
      <span class="text-2xl font-bold text-red">{{store.state.user.rating}}</span>
      <a-select
          class="dark:bg-boxdark"
          v-model:value="selectedBot"
          size="large"
          style="width: 200px; margin: 2rem"
          :options="bots"
      ></a-select>
    </div>
    <div class="flex p-3 gap-3 flex-col items-center w-1/2">
      <img class="rounded-full" :src="store.state.user.photo" width="64" alt="avator" />
      <span class="text-2xl font-bold">{{store.state.pk.opponent_username}} </span>
      <span class="text-2xl font-bold text-red">{{ store.state.pk.opponent_rating }}</span>
    </div>

  </div>
  <div class="text-center">
    <EButton @click="changeState" :class="buttonInfo === '开始匹配' ? 'bg-primary' : 'bg-slate-400 border-slate-400 ring-slate-400'" >
      {{buttonInfo}}
    </EButton>
  </div>
</template>

<style scoped>

</style>