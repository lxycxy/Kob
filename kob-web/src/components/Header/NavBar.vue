<script setup>
import DarkModeSwitch from "@/components/Header/DarkModeSwitch.vue";
import UserArea from "@/components/Header/UserArea.vue";
import router from "@/router/index.js";

</script>

<template>
  <div class="w-full h-20 bg-white dark:text-white dark:bg-boxdark rounded-lg shadow-md flex justify-around items-center">
    <div class="w-1/6 ml-5 text-xl flex font-bold">
      <img class="mr-3" src="@/assets/images/snake.svg" width="32"  />
      <span class="dark:text-white">玩蛇仙人</span>
    </div>

    <div class="w-4/6 h-full flex space-x-16">
      <div
          @click="router.push({name: 'pk'})"
          :class="router.currentRoute.value.name === 'pk' ? 'text-primary border-b border-primary ' : ''"
          class="h-full justify-center flex items-center hover: cursor-pointer hover:text-primary hover:border-b border-primary" >
        对战
      </div>
      <div
          @click="router.push({name: 'record'})"
          :class="router.currentRoute.value.name === 'record' ? 'text-primary border-b border-primary ' : ''"
          class="h-full justify-center flex items-center hover: cursor-pointer hover:text-primary hover:border-b border-primary" >
        对局列表
      </div>
      <div
          @click="router.push({name: 'rank'})"
          :class="router.currentRoute.value.name === 'rank' ? 'text-primary border-b border-primary ' : ''"
          class="h-full justify-center flex items-center hover: cursor-pointer hover:text-primary hover:border-b border-primary" >
        积分榜
      </div>
    </div>
<!--    黑夜模式切换-->
    <ul class="w-1/6 flex gap-5 m-0 items-center">
      <li>
        <DarkModeSwitch />
      </li>
      <li>
        <UserArea />
      </li>
    </ul>
  </div>
</template>
