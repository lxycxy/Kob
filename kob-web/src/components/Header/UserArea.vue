<script setup>
import {useStore} from "vuex";
import {ref} from "vue";
const store = useStore()
const dropdownOpen = ref(false)

// 监听外部点击，点击外部关闭下拉栏
document.addEventListener('click', event => {
  let dropdown = document.getElementById('dropdown')
  let target = event.target;
  if (! dropdown.contains(target))
    dropdownOpen.value = false
})

</script>

<template>
  <div class="relative" id="dropdown">
    <a v-if="store.state.user.is_login"   class="flex gap-2 items-center" @click.prevent="dropdownOpen = !dropdownOpen">
      <span class="mr-3 font-semibold">{{ store.state.user.username }}</span>
      <span class="flex items-center space-x-2">
        <img class="rounded-full" :src="store.state.user.photo" width="48"  alt="avatar" />
         <svg
             :class="dropdownOpen && 'rotate-180'"
             class="hidden fill-current sm:block"
             width="12"
             height="8"
             viewBox="0 0 12 8"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
         >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
        />
      </svg>
      </span>

    </a>
    <a v-else href="/login">
      登录
    </a>
  </div>
  <div v-show="dropdownOpen" id="dropdown-content" class="absolute right-6 bg-white rounded-lg dark:bg-boxdark mt-5 w-50">
    <ul class="px-4 py-4 flex flex-col gap-3">
      <li class="rounded cursor-pointer border-b border-slate-300 hover:text-primary p-2 duration-200 ease-in-out font-medium">
        我的Bot
      </li>
      <li @click="store.dispatch('logout')" class="rounded cursor-pointer hover:text-primary p-2 duration-200 ease-in-out font-medium">
        退出登录
      </li>
    </ul>
  </div>

</template>
