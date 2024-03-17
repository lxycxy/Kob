<script setup>
import EButton from "@/components/button/EButton.vue";
import EInput from "@/components/input/EInput.vue";
import $ from 'jquery'
import {reactive} from "vue";
import { message } from 'ant-design-vue';
import router from "@/router/index.js";

let registerForm = reactive({
  username : '',
  password : '',
  confirmedPassword: '',
})

const register = () => {

  $.ajax({
    url: "http://localhost:3000/api/user/account/register",
    type: "post",
    data: {
      username: registerForm.username,
      password: registerForm.password,
      confirmedPassword: registerForm.confirmedPassword
    },
    success (resp) {
      if (resp.error_message === 'success') {
        message.success("注册成功, 现在可以进入网站尽情玩耍了~");
        router.push({name: 'login'})
      } else {
        message.warning(resp.error_message);
      }
    },
    error (resp) {
      alert(resp.message)
    }
  });

}
</script>

<template>
  <div class="flex justify-center">
    <div class="mt-10 flex flex-col justify-center shadow-lg rounded-lg p-10 bg-white w-2/3 md:1/3 xl:w-1/4 dark:bg-black">
      <img src="../../assets/images/snake.svg" width="32" alt="logo"/>
      <h3 class="mb-5 mt-5 text-2xl dark:text-whiten">Sign up King of bot</h3>
      <EInput v-model="registerForm.username" label="用户名">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-current"
            width="22"
            height="22"
            viewBox="0 0 448 512"
        >
          <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path fill="#7f7f7f" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
        </svg>
      </EInput>
      <EInput v-model="registerForm.password" label="密码" type="password" >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-current"
            width="22"
            height="22"
            viewBox="0 0 448 512">
          <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path fill="#7f7f7f" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
        </svg>
      </EInput>
      <EInput v-model="registerForm.confirmedPassword" label="再次确认密码" type="password" >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-current"
            width="22"
            height="22"
            viewBox="0 0 448 512">
          <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path fill="#7f7f7f" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
        </svg>
      </EInput>
      <div class="text-center">
        <EButton @click="register" class="w-2/3 mt-5">
          注册
        </EButton>
      </div>
      <a href="/login" class="text-primary mt-3">已有账号？跳转登录</a>
    </div>
  </div>`
</template>
