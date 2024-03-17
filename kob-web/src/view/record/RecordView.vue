<script setup>
import { ref} from "vue";
import $ from 'jquery'
import {useStore} from "vuex";
import router from "@/router/index.js";
import {stringTo2D} from "@/utils/utils.js";
const store = useStore()
const columns = [
  {
    title: 'A',
    dataIndex: 'a_username',
  },
  {
    title: 'B',
    dataIndex: 'b_username',
  },
  {
    title: '对战结果',
    dataIndex: 'result',
  },
  {
    title: '对战时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'operator',
  },
]
const pageSize = ref(8)
const data = ref([]);
const currentPage = ref(1);
const total = ref(0);
const getRecord = () => {
  $.ajax({
    url: "http://localhost:3000/api/record/getlist/",
    data: {
      page: currentPage.value,
    },
    type: "get",
    headers: {
      Authorization: "Bearer " + store.state.user.token,
    },
    success(resp) {
      console.log(resp);
      data.value = resp.records;
      total.value = resp.records_count;
    },
    error(resp) {
      console.log(resp);
    }
  })
}

getRecord(currentPage.value)
const openRecordContent = (id) => {

  for (const record of data.value) {
    if (record.record.id === id) {
      store.commit("updateIsRecord", true);
      store.commit("updateGame", {
        map: stringTo2D(record.record.map),
        a_id: record.record.aid,
        a_sx: record.record.asx,
        a_sy: record.record.asy,
        b_id: record.record.bid,
        b_sx: record.record.bsx,
        b_sy: record.record.bsy,
      });
      store.commit("updateSteps", {
        a_steps: record.record.asteps,
        b_steps: record.record.bsteps,
      });
      store.commit("updateRecordLoser", record.record.loser);
      router.push({
        name: "recordContent",
        params: {
          id
        }
      })
      break;
    }
  }


  router.push({
    name: 'recordContent',
    params: {
      id: id
    }
  })
}

</script>

<template>
  <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      size="middle"
      bordered
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'a_username'">
        <div class="flex gap-2">
          <a>{{ record.a_username }}</a>
          <img class="rounded-full" :src="record.a_photo"  width="32" />
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'b_username'">
        <div class="flex gap-2">
          <a>{{ record.b_username }}</a>
          <img class="rounded-full" :src="record.b_photo"  width="32" />
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'createTime'">
        {{record.record.createTime}}
      </template>
      <template v-else-if="column.dataIndex === 'operator'">
        <a @click="openRecordContent(record.record.id)" class="text-primary hover:font-bold hover:text-primary">回放</a>
      </template>
    </template>
    <template #title>
      <div class="font-bold text-xl">对战列表</div>
    </template>
    <template #footer>
      <a-pagination @change="getRecord" v-model:current="currentPage" v-model:pageSize="pageSize" :total="total" show-less-items />
    </template>
  </a-table>

</template>

