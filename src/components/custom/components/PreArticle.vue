<template>
  <div class="pre">
    <div class="pre-content">
      <img class="preImage" src="@/assets/image/pre.png" />
      <div class="pre-page">
        <el-page-header :icon="'ArrowLeft'">
          <template #title>
            <span></span>
          </template>
          <template #content>
            <div class="user">
              <el-avatar :size="32" :src="avatar" />
              <span class="ml5 cursor"> {{ username }} </span>
            </div>
          </template>
          <template #extra>
            <div class="op">
              <el-button size="small" type="danger" class="follow">关注</el-button>
              <el-icon class="ml15 mr5">
                <IconSvg :name="'fenxiang'" />
              </el-icon>
            </div>
          </template>
        </el-page-header>
      </div>
      <div class="article-content">
        <div class="title">
          <h1>{{ title }}</h1>
        </div>
        <div class="article-pre-content">
          <p v-html="content"></p>
        </div>
      </div>
      <div class="footer">
        <div class="input">
          <span class="input-content"><IconSvg :name="'bianji'" />说点什么...</span>
        </div>
        <div class="op-icon">
          <span><IconSvg :name="'aixin'" /><span class="cursor">300</span></span>
          <span><IconSvg :name="'shoucang'" /><span class="cursor">50</span></span>
          <span><IconSvg :name="'pinglun'" /><span class="cursor">200</span></span>
        </div>
        <el-backtop target=".article-content" right="10" bottom="70" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from 'vue';
import { personal } from '@/services/index';
import { useUserStore } from '@/stores/user';

const { userInfo } = useUserStore();
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  user: {
    type: String,
    default: ''
  }
});
const username = computed(() => props.user || userInfo.userName);
const avatar = ref('');
onMounted(() => {
  personal.getPersonal({ userName: username.value }).then((res) => {
    avatar.value = `http://localhost:3000${res.data.avatar}`;
  });
});
</script>
<style scoped>
.pre {
  width: 100%;
}
.preImage {
  width: 382px;
  height: 763px;
}
.pre-content {
  height: 763px;
  text-align: center;
  position: relative;
}
.pre-page {
  width: 320px;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.user {
  display: flex;
  align-items: center;
}

.follow {
  border-radius: 16px;
}

.op {
  display: flex;
  align-items: center;
}
.article-content {
  font-size: 14px;
  width: 320px;
  height: 75%;
  position: absolute;
  top: 25%;
  left: 50%;
  text-align: left;
  transform: translate(-50%, -15%);
  overflow: auto;
  scrollbar-width: none;
}
.input {
  padding: 5px;
}
.input-content {
  display: inline-block;
  padding: 5px;
  width: 120px;
  border: 1px solid #121212;
  border-radius: 16px;
}
.op-icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
  padding: 5px;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 330px;
  height: 80px;
  position: absolute;
  top: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0 0 25px 25px;
  border: 1px solid #f5f5f5;
  background-color: #ffffff;
}
</style>
