<template>
  <el-menu class="el-menu-title" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0">
      <div><img class="logo" src="../../assets/logo.png" alt="Logo" /></div>
    </el-menu-item>
    <el-menu-item index="1">黑暗模式 <el-switch class="ml5" v-model="model" /></el-menu-item>
    <el-sub-menu index="2">
      <template #title>{{ username }}</template>
      <el-menu-item
        v-for="(item, key) in menus"
        :index="getIndex(key)"
        :key="key"
        @click="userClick(key)"
      >
        {{ item.name }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
  <el-row class="nav">
    <el-col :span="4" class="left">
      <el-menu class="el-menu-vertical" router @select="handleSelect" :default-active="activeKey">
        <el-sub-menu index="1">
          <template #title>
            <el-icon :size="20"><location /></el-icon>
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
            <span>资源管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="foodInformation">美食资料</el-menu-item>
            <el-menu-item index="siteInformation">景点资料</el-menu-item>
          </el-menu-item-group>
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
    <el-col :span="20" class="right">
      <el-card class="border">
        <template #header
          ><h2>{{ pageHeaderTitle }}</h2></template
        >
        <router-view />
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { cookie } from '@/utils';

const router = useRouter();
const route = useRoute();
let activeKey = ref('/');
onMounted(() => {
  activeKey.value = route.name as string;
  handleSelect(activeKey.value);
});
const model = ref(false);
const username = ref('管理员');
const getIndex = (key: number) => `2-${key + 1}`;

const menus = ref([
  { name: '个人中心', path: '/user' },
  { name: '密码修改', path: '/role' },
  { name: '系统设置', path: '/setting' },
  { name: '退出登录', path: '/logout' }
]);
const pageHeaderTitle = ref('首页');
const userClick = (key: number) => {
  if (key === 3) {
    localStorage.setItem('isAuthenticated', 'false');
    cookie.remove('token');
    router.push('/login');
  }
};
const handleSelect = (key: string) => {
  const options: any = {
    foodInformation: '美食资料',
    siteInformation: '景点历史',
    user: '用户管理',
    personal: '个人中心'
  };
  pageHeaderTitle.value = options[key] || '首页';
};
</script>
<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.el-menu-title {
  left: 0;
  top: 0;
  height: auto;
  position: fixed;
  width: 100%;
  z-index: 999;
}
.logo {
  width: 50px;
  height: 50px;
  background-color: #2c3142;
  border-radius: 50px;
  border: 3px solid #2c3142;
}
.left {
  width: 200px;
  top: 60px;
  position: relative;
}
.el-menu-vertical {
  height: 100vh;
}
.right {
  position: relative;
  top: 60px;
  padding: 20px;
  height: 100%;

  overflow-y: scroll;
  scrollbar-width: none;
}
.border {
  border-radius: 16px;
}
.nav {
  height: calc(100vh - 60px);
  margin-bottom: 20px;
}
</style>
