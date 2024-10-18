<template>
  <div class="page">
    <el-page-header @back="goBack" title="返回" class="pageheader">
      <template #content>
        <div class="title">
          <strong>{{ title }}</strong>
        </div>
      </template>
    </el-page-header>
    <el-card class="content">
      <div class="form">
        <div class="left">
          <el-form :model="form" label-width="80px">
            <el-form-item label="文章标题">
              <el-input style="width: 300px" v-model="form.name" />
            </el-form-item>
            <el-form-item v-if="route.params.id === 'edit'" label="Id">
              {{ form.id }}
            </el-form-item>
            <el-form-item label="封面">
              <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :headers="{
                  Authorization: `Bearer ${token}`
                }"
                :action="uploadUrl"
                :before-upload="beforeAvatarUpload"
                name="image"
                class="avatar-uploader"
              >
                <el-image v-if="form.img" :src="form.img" class="avatar" fit="contain" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="文章简介">
              <el-input v-model="form.desc" style="width: 400px" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item label="文章介绍">
              <wang-editor :content="form.content" />
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="onSubmit('submit')">提交</el-button>
              <el-button type="primary" @click="preShow">预览</el-button>
              <el-button type="primary" @click="onSubmit('save')">保存草稿箱</el-button>
              <el-button @click="goBack">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <PreArticle :title="form.name" :content="form.content" :user="form.creater" />
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, provide, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, type UploadProps } from 'element-plus';
import { useLoginStore } from '@/stores/login';
import { articles } from '@/services';
import { beforeUpload } from '@/utils';

const { token } = useLoginStore();
const router = useRouter();
const route = useRoute();
const uploadUrl = 'http://121.37.10.32:3000/api/upload/resource';
const form: any = reactive({
  name: '',
  img: '',
  desc: '',
  content: '',
  id: '',
  creater: ''
});
const editorValue = ref(null);
const allImages = ref([]);
const lastUploadImages = ref([]);
const title = ref('创建文章');
provide('editorValue', editorValue);
provide('allImages', allImages);
provide('lastUploadImages', lastUploadImages);
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.img = `http://121.37.10.32:3000${response.data}`;
};
const beforeAvatarUpload = beforeUpload;
const onSubmit = (type: string) => {
  const params: any = { ...form };
  params.status = type === 'save' ? 3 : 0;
  params.content = editorValue.value;
  params.deleteImages = allImages.value.filter(
    (item) => lastUploadImages.value.findIndex((ele: any) => ele.src === item) === -1
  );
  if (route.params.id === 'edit') {
    articles.updateArticle(params).then((res) => {
      ElMessage.success('更新成功');
      router.push('/articles');
    });
  } else {
    articles.createArticle(params).then((res) => {
      ElMessage.success('添加成功');
      router.push('/articles');
    });
  }
  // params.img = form.img.replace('http://121.37.10.32:3000', '')
};
const preShow = () => {
  form.content = editorValue.value;
};
const goBack = () => {
  router.back();
};
onMounted(() => {
  const params = JSON.parse(sessionStorage.getItem('article') || '') || {};
  if (route.params.id === 'edit') {
    for (const key in form) {
      form[key] = params[key];
    }
  } else {
    title.value = '创建文章';
  }
});

onUnmounted(() => {
  sessionStorage.removeItem('article');
});
</script>
<style scoped>
.page {
  width: 100%;
}
.pageheader {
  padding: 0 20px;
  height: 44px;
  line-height: 44px;
  display: flex;
  align-items: center;
}
.title {
  font-size: 14px;
}
.content {
  height: 95vh;
  overflow-y: scroll;
  scrollbar-width: none;
}
.form {
  display: flex;
  align-items: center;
  border: #f5f5f5 1px solid;
  border-radius: 16px;
  padding: 12px 20px 0 20px;
}
.left {
  flex: 1;
}
.right {
  flex: 1;
}
.avatar-uploader .avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>
