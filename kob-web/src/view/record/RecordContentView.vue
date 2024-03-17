<script setup>

import PlayGround from "@/view/pk/PlayGround.vue";
import EButton from "@/components/button/EButton.vue";
import router from "@/router/index.js";
import $ from 'jquery'
import {useStore} from "vuex";
import {stringTo2D} from "@/utils/utils.js";
const store = useStore()
const getGameRecord = () => {
    $.ajax({
      url: `http://localhost:3000/api/record/get/` + router.currentRoute.value.params.id,
      type: 'get',
      headers: {
        Authorization: 'Bearer ' + store.state.user.token,
      },
      success(resp) {
            store.commit("updateIsRecord", true);
            store.commit("updateGame", {
              map: stringTo2D(resp.map),
              a_id: resp.aid,
              a_sx: resp.asx,
              a_sy: resp.asy,
              b_id: resp.bid,
              b_sx: resp.bsx,
              b_sy: resp.bsy,
            });
            store.commit("updateSteps", {
              a_steps: resp.asteps,
              b_steps: resp.bsteps,
            });
            store.commit("updateRecordLoser", resp.loser);
      }
    })
}
getGameRecord();

</script>

<template>
  <PlayGround />
  <div class="text-center">
    <EButton @click="router.back()" class="w-20 h-12">返回</EButton>
  </div>
</template>
