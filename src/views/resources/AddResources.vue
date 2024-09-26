<template>
  <div class="page">
    <el-page-header @back="goBack" title="返回" class="pageheader">
      <template #content>
        <span class="title"> {{ title }} </span>
      </template>
    </el-page-header>
    <div class="content">
      <div class="form"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const title = computed(() => {
  const op = route.params.id === 'create' ? '创建' : '编辑';
  const type = route.query.type === 'food' ? '美食' : '景点';
  return op + type;
});
const goBack = () => {
  console.log(title);
  router.back();
};
</script>
<style scoped>
.page {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #c2c2c2;

  .pageheader {
    background-color: #ffffff;
    height: 44px;
    line-height: 44px;
  }
  .title {
    font-size: 14px;
  }

  .content {
    width: 100%;
    height: 100vh;
    padding: 0 20px;
    .form {
      height: 100%;
      width: 100%;
      background-color: #ffffff;
      margin: 0 auto;
      border: 2px solid #c2c2c2;
      border-radius: 16px;
    }
  }
}
</style>
