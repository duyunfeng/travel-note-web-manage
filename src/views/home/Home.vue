<template>
  <el-menu class="el-menu-title" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0">
      <div><img class="logo" src="@/assets/image/logo.png" alt="Logo" /></div>
    </el-menu-item>
    <el-menu-item index="1"
      >黑暗模式 <el-switch class="ml5" v-model="model" @change="useDark"
    /></el-menu-item>
    <el-sub-menu index="2">
      <template #title>{{ username }}</template>
      <el-menu-item
        v-for="(item, key) in menus"
        :index="getIndex(key)"
        :key="key"
        @click="userClick(key)"
      >
        {{ item.title }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
  <el-row class="nav">
    <el-col :span="4" class="left">
      <el-menu class="el-menu-vertical" router @select="handleSelect" :default-active="activeKey">
        <el-menu-item index="/homeView">
          <el-icon :size="18"><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="articles">
          <el-icon :size="18"><Menu /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
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
import { emitter } from '@/middleware/Emitter';
import { useUserStore } from '@/stores/user';
import { setDarkMode } from '@/utils';

const { userInfo, changeDark, isDark } = useUserStore();
const route = useRoute();
const router = useRouter();
const model = ref(isDark);
let activeKey = ref('/');
onMounted(() => {
  activeKey.value = route.name as string;
  username.value = userInfo.userName || '';
  handleSelect(activeKey.value);
});
const username = ref('管理员');
const getIndex = (key: number) => `2-${key + 1}`;

const menus = ref([
  { title: '个人中心', path: '/personal', name: 'personal' },
  { title: '退出登录', path: '/logout', name: 'logout' }
]);
const pageHeaderTitle = ref('首页');
const userClick = (key: number) => {
  if (key === 1) {
    emitter.emit('ROUTER:LOGOUT');
  } else {
    const name = menus.value[key].name;
    activeKey.value = name;
    handleSelect(name);
    router.push(menus.value[key].path);
  }
};
const useDark = (val: boolean) => {
  setDarkMode(val);
  changeDark(val);
};
const handleSelect = (name: string) => {
  activeKey.value = name;
  const options: any = {
    foodInformation: '美食资料',
    siteInformation: '景点历史',
    user: '用户管理',
    personal: '个人中心',
    articles: '文章管理'
  };
  pageHeaderTitle.value = options[name] || '首页';
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
  min-width: 150px;
  top: 60px;
  position: relative;
}
.el-menu-vertical {
  height: 100vh;
}
.right {
  position: relative;
  top: 60px;
  padding: 5px 5px 10px 5px;
  height: 100%;
  max-width: calc(100% - 200px);
  overflow-y: scroll;
  scrollbar-width: none;
}
.border {
  border-radius: 16px;
  height: 100%;
}
.nav {
  height: calc(100vh - 60px);
}
</style>
