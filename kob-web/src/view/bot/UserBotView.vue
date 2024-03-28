<script setup>
import {useStore} from "vuex";
import $ from 'jquery'
import {reactive, ref} from "vue";
import ETable from "@/components/table/ETable.vue";
import EButton from "@/components/button/EButton.vue";
import EModal from "@/components/modal/EModal.vue";
import EInput from "@/components/input/EInput.vue";
import "codemirror/mode/javascript/javascript.js"
import Codemirror from "codemirror-editor-vue3"
import {message} from "ant-design-vue";
const store = useStore()

const bots = ref([])
const visible = ref(false);
const deleteVisible = ref(false)
const model = ref('add'); // add、detail、update
const columns = [
  {
    title: '名称',
    dataIndex: 'title',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createtime',
  },
  {
    title: '修改时间',
    dataIndex: 'modifytime',
  },
  {
    title: '操作',
    dataIndex: 'operator',
  }
]
const getBotList = () => {
  $.ajax({
    url : 'http://localhost:3000/api/user/bot/getlist/',
    type: 'get',
    headers: {
      Authorization: "Bearer " + store.state.user.token,
    },
    success (resp) {
      console.log(resp)
      bots.value = resp;
    },
    error (resp) {
      console.log(resp)
    }
  })
}
getBotList();

const openModal = (openModel, record = null) => {

  model.value = openModel;
  visible.value = true

  if (openModel === 'detail' || openModel === 'update') {
    botForm.id = record.id
    botForm.title = record.title;
    botForm.description = record.description
    botForm.content = record.content
  }
}

const cleanForm = () => {
  visible.value = false
  deleteVisible.value = false
  model.value = 'add'
  botForm = reactive({
    id: '',
    title: '',
    description: '',
    content: `/*
* please write your Java code here
* 在下面编写Java 代码
*/`,
  })
}
const updateBot = () => {
  $.ajax({
    url: "http://localhost:3000/api/user/bot/update/",
    type: 'post',
    headers: {
      Authorization: "Bearer " + store.state.user.token,
    },
    data: {
      bot_id: botForm.id,
      title: botForm.title,
      description: botForm.description,
      content: botForm.content
    },
    success (resp) {
      console.log(resp)
      if (resp.error_message === 'success') {
        message.success('修改成功')
        getBotList();
      } else {
        message.error(resp.error_message);
      }
      cleanForm();
    },
    error (resp) {
      message.error(resp.message)
    }
  })
}
const addBot = () => {
  $.ajax({
    url: "http://localhost:3000/api/user/bot/add/",
    type: 'post',
    headers: {
      Authorization: "Bearer " + store.state.user.token,
    },
    data: {
      title: botForm.title,
      description: botForm.description,
      content: botForm.content
    },
    success (resp) {
      console.log(resp)
      if (resp.error_message === 'success') {
        message.success('添加成功')
        getBotList();
      } else {
        message.error(resp.error_message);
      }
      cleanForm();
    },
    error (resp) {
      message.error(resp.message)
    }
  })
}

const deleteBot = () => {
  $.ajax({
    url: "http://localhost:3000/api/user/bot/remove/",
    type: 'post',
    headers: {
      Authorization: "Bearer " + store.state.user.token,
    },
    data: {
      bot_id: botForm.id
    },
    success (resp) {
      console.log(resp)
      if (resp.error_message === 'success') {
        message.success('删除成功')
        getBotList();
      } else {
        message.error(resp.error_message);
      }
      cleanForm();
    },
    error (resp) {
      message.error(resp.message)
    }
  })
}

const submitBot = () => {
  if (model.value === 'update') updateBot();
  else if (model.value === 'add') addBot();
  else {
    message.error('unknown error');
  }
}

let botForm = reactive({
  id: '',
  title: '',
  description: '',
  content: `/*
* please write your Java code here
* 在下面编写Java 代码
*/`,
})


const cmRef = ref()

const cmOptions = {
  mode: "text/x-java"
}
const onChange = (val, cm) => {
  console.log(cm.getValue())
}

const onInput = (val) => {
  console.log(val)
}

const onReady = (cm) => {
  console.log(cm.focus())
}

const openDeleteModal = (id) => {
  botForm.id = id;
  deleteVisible.value = true
}
</script>

<template>
  <div class="flex p-10 items-start dark:text-white">
    <div class="w-1/4 bg-white rounded-lg dark:bg-boxdark p-5 mr-5">
      <img :src="store.state.user.photo" class="mx-auto w-20 rounded-full"  alt="avatar"/>
      <div class="font-bold mt-2 text-xl italic text-center">{{store.state.user.username}}</div>
      <div class="bg-meta-3 mx-auto w-1/2 mt-2 font-bold rounded-xl h-10 flex items-center justify-center">天梯积分：{{store.state.user.rating}}</div>
    </div>
    <div class="flex-1 bg-white rounded-lg dark:bg-boxdark p-5 ">
      <div class="font-bold flex justify-between p-3 text-2xl border-b border-slate-200">
        我的Bot
        <EButton class="text-base" @click="openModal('add')">添加一个Bot</EButton>
      </div>
      <div v-if="bots.length === 0" class="italic font-bold text-2xl text-center m-5">
        你还没有蛇!
      </div>
      <div v-else>
        <ETable class="w-full" :columns="columns" :tableData="bots">
          <template #headerCell="{column}">
            {{ column.title }}
          </template>
          <template #bodyCell="{column, record}">
            <div class="cursor-pointer" v-if="column.dataIndex === 'operator'">
              <a @click="openModal('detail', record)" class="hover:font-bold text-primary mr-3">详情</a>
              <a @click="openModal('update', record)" class="hover:font-bold text-meta-3 mr-3">修改</a>
              <a @click="openDeleteModal(record.id)" class="hover:font-bold text-red" >删除</a>
            </div>
          </template>
        </ETable>
      </div>
    </div>
  </div>


  <EModal
      v-model="visible"
      @cancel="cleanForm"
  >
    <template #modalHeader>
      Bot
    </template>
    <div class="grid grid-cols-3 gap-1 justify-center">
      <div class="col-span-1 rounded-lg dark:bg-form-input bg-slate-100 flex justify-center items-center">Bot名称</div>
      <EInput :disable="model === 'detail'" v-model="botForm.title" class="col-span-2" />
      <div class="col-span-1 rounded-lg dark:bg-form-input bg-slate-100 flex justify-center items-center">Bot描述</div>
      <EInput :disable="model === 'detail'"  v-model="botForm.description" class="col-span-2" />
    </div>
    <h3 class="m-2">Java代码</h3>
    <Codemirror
        v-model:value="botForm.content"
        :options="cmOptions"
        border
        height="250"
        ref="cmRef"
        @change="onChange"
        @input="onInput"
        @ready="onReady"
    />
    <template #modalFooter>
      <div class="flex justify-end gap-5">
        <EButton @click="cleanForm" class="bg-slate-400 px-5 ring-slate-400 border-slate-400">取消</EButton>
        <EButton @click="submitBot" v-show="model !== 'detail'" class="px-5">确认</EButton>
      </div>
    </template>
  </EModal>

  <EModal
      v-model="deleteVisible"
      @cancel="cleanForm"
      @confirm="deleteBot"
  >
    <template #modalHeader>
      删除Bot
    </template>
    你确定要删除这个Bot吗
  </EModal>
</template>
