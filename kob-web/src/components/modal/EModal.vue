<script setup>
import EButton from "@/components/button/EButton.vue";
import {computed, getCurrentInstance} from "vue";

const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const isFooterUsed = computed(() => {
  return !!getCurrentInstance().slots.modalFooter
})

</script>
<template>
  <div v-if="props.modelValue" class="dark:text-white fixed left-0 top-0 w-full h-full">
    <div class="fixed z-0 left-0 top-0 w-full h-full bg-opacity-50 bg-boxdark"></div> <!-- 修改这里的类名为 bg-gray-900 -->
    <div class="top-12 fixed w-1/2 left-1/2 top-10 transform -translate-x-1/2 bg-white z-10 dark:bg-boxdark p-8 rounded-lg shadow-lg">
      <div class="text-2xl border-b border-slate-300 pb-3 dark:text-white mb-10">
        <slot name="modalHeader"></slot>
      </div>
      <slot></slot>
      <slot v-if="isFooterUsed" name="modalFooter"></slot>
      <div v-else class="flex justify-end gap-5 mt-10">
        <EButton @click="$emit('cancel')" class="bg-slate-400 px-5 ring-slate-400 border-slate-400">取消</EButton>
        <EButton @click="$emit('confirm')" class="px-5">确认</EButton>
      </div>
    </div>
  </div>
</template>
