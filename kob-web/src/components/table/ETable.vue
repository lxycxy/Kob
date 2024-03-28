<script setup>
const props = defineProps(['columns', 'tableData']);

</script>

<template>
  <table class="dark:text-whiten text-center">
    <thead class="w-full h-16 bg-slate-200 dark:bg-boxdark  ">
    <tr>
      <td v-for="headerItem in props.columns">
        <slot name="headerCell" :column="headerItem"></slot>
      </td>
    </tr>
    </thead>
    <tbody>
      <tr v-for="row in tableData" class="dark:hover:bg-boxdark hover:bg-slate-200 duration-75 h-12">
        <td v-for="headerIndex in columns">
          <div v-if="row[headerIndex.dataIndex]">
            {{ row[headerIndex.dataIndex] }}
          </div>
          <slot v-else name="bodyCell" :record="row" :column="headerIndex"></slot>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <slot name="footer"></slot>
    </tfoot>
  </table>
</template>
