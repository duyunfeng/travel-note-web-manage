<template>
  <el-menu class="el-menu" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0">
      <img class="logo" src="../../assets/logo.png" alt="Logo" />
    </el-menu-item>
    <el-menu-item index="1">黑暗模式 <el-switch class="ml5" v-model="model" /></el-menu-item>
    <el-sub-menu index="2">
      <template #title>{{ username }}</template>
      <el-menu-item v-for="(item, key) in menus" :index="getIndex(key)" :key="key" @click="userClick(key)">
        {{ item.name }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
  <el-row class="mt20">
    <el-col :span="4" class="left">
      <el-menu class="el-menu-vertical" router>
        <el-sub-menu index="1">
          <template #title>
            <el-icon :size="18"><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon :size="18"><Menu /></el-icon>
            <span>Navigator Two</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon :size="18"><document /></el-icon>
            <span>Navigator Three</span>
          </template>
        </el-sub-menu>
        <el-menu-item index="user">
          <el-icon :size="18"><user /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="personal">
          <el-icon :size="18"><setting /></el-icon>
          <span>个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="18" class="right">
      <router-view />
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router/index'

const model = ref(false)
const username = ref('管理员')
const getIndex = (key:number) => `2-${key + 1}`

const menus = ref([
  { name: '个人中心', path: '/user' },
  { name: '密码修改', path: '/role' },
  { name: '系统设置', path: '/setting' },
  { name: '退出登录', path: '/logout' }
])
const userClick = (key: number) => {
  if (key === 3) {
    localStorage.removeItem('isAuthenticated')
    router.push('/login')
  }
}
</script>
<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.logo {
  width: 40px;
  height: 40px;
  background-color: #2c3142;
  border-radius: 50px;
  border: 3px solid #2c3142;
}
.left {
  min-width: 200px;
}
.right {
  min-width: 400px;
}

.el-menu-vertical {
  min-width: 200px;
  min-height: 70vh;
}
</style>
