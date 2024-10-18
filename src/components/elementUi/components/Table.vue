<template>
  <el-table :data="tableData" border style="width: 100%" max-height="500">
    <template v-for="(item, index) in tableColumn" :key="index">
      <el-table-column
        v-if="item.show"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :fixed="item.fixed"
        :min-width="item.minWidth"
        :prop="item.prop"
        :show-overflow-tooltip="item.showOverflowTooltip"
      >
        <template #default="scope">
          <slot
            v-if="item.isSlot && item.prop === item.name"
            :name="item.name"
            :scope="scope.row"
          ></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <el-pagination
    class="fr mt20"
    :hide-on-single-page="total <= 10"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="pageSizeArray"
    :layout="layout"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import type { Column } from 'element-plus';
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array<Column>,
    default: () => []
  },
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
  },
  paginationDirection: {
    type: String,
    default: 'right'
  },
  pageSizeArray: {
    type: Array,
    default: () => [10, 20, 30, 40, 50]
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  }
});
const tableData = computed(() => props.data);
const tableColumn = computed(() => props.columns);
const currentPage = computed(() => props.currentPageNumber);
const pageSize = computed(() => props.pageSizeNumber);
const pageSizeArray = computed(() => props.pageSizeArray);
const layout = computed(() => props.layout);
const emit = defineEmits(['update:currentPageNumber', 'update:pageSizeNumber']);
const handleSizeChange = (val: number) => {
  emit('update:pageSizeNumber', val);
};
const handleCurrentChange = (val: number) => {
  emit('update:currentPageNumber', val);
};
</script>
<style scoped></style>
