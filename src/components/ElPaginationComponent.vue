<template>
  <div>
    <el-pagination
      :hide-on-single-page="total <= pageSize"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue';
const props = defineProps({
  currentPageNumber: {
    type: Number,
    default: 1
  },
  pageSizeNumber: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  }
});
const currentPage = computed(() => props.currentPageNumber);
const pageSize = computed(() => props.pageSizeNumber);
const handleSizeChange = (val: number) => {
  console.log(`每页 ${val} 条`);
};
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
};
</script>
