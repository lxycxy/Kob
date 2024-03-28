<script setup>
import $ from 'jquery'
import {useStore} from "vuex";
import {ref} from "vue";
const store = useStore()

const userList = ref([])
const getRankList = () => {

    $.ajax({
      url: 'http://localhost:3000/api/ranklist/getlist/',
      type: 'get',
      headers: {
        Authorization: "Bearer " + store.state.user.token
      },
      success(resp) {
        userList.value = resp.users
      }
    })
}
getRankList()
</script>

<template>
  <div class="flex p-8 justify-center items-center dark:text-whiten">
    <div class="w-1/2 bg-white dark:bg-boxdark">
      <ul class="m-0">
        <li v-for="(item, index) in userList" :class="index === userList.length - 1 ? '' : ' border-b '" class="grid grid-cols-2 border-slate-300 justify-items-center items-center h-14">
          <div class="flex font-bold items-center p-2 h-14">
            <img :src="item.photo" alt="avator" class="rounded-full max-h-full" />
            <span class="ml-2">{{item.username}}</span>
          </div>
          <div class="text-2xl dark:text-whiten text-center italic  font-bold p-1.5 text-black ">{{index + 1}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
