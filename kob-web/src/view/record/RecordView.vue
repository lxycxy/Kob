<script setup>
import { ref} from "vue";
import $ from 'jquery'
import {useStore} from "vuex";
import router from "@/router/index.js";
import {stringTo2D} from "@/utils/utils.js";
import ETable from "@/components/table/ETable.vue";
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
  <div class="p-8">
    <ETable class="w-full table-fixed" :columns="columns" :table-data="data">
      <template #headerCell="{ column }">
        {{ column.title }}
      </template>
      <template #bodyCell="{record, column}">
        <div v-if="column.dataIndex === 'createTime'"> {{ record.record.createTime }} </div>
        <div v-else-if="column.dataIndex === 'operator'">
          <a class="text-primary cursor-pointer" @click="openRecordContent(record.record.id)">查看回放</a>
        </div>
      </template>
      <template #footer>
        <a-pagination @change="getRecord" v-model:current="currentPage" v-model:pageSize="pageSize" :total="total" show-less-items />
      </template>
    </ETable>
  </div>
</template>

