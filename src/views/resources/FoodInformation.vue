<template>
  <div>
    <Resources :title />
  </div>
</template>
<script lang="ts" setup>
import Resources from './Resources.vue';

const title = '美食资料';
</script>
<style scoped>
.content {
  padding: 20px 20px 0;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
