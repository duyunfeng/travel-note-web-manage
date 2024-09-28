<template>
  <div class="page">
    <el-page-header @back="goBack" title="返回" class="pageheader">
      <template #content>
        <div class="title">
          <strong>{{ op + type }}</strong>
        </div>
      </template>
    </el-page-header>
    <el-card class="content">
      <div class="form">
        <div>
          <el-form :model="form" label-width="80px">
            <el-form-item :label="label">
              <el-input style="width: 300px" v-model="form.name" />
            </el-form-item>
            <el-form-item label="封面">
              <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :action="uploadUrl"
                :before-upload="beforeAvatarUpload"
                name="image"
                class="avatar-uploader"
              >
                <el-image v-if="form.img" :src="form.img" class="avatar" fit="contain" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="所在地">
              <el-select v-model="form.city" filterable style="width: 300px" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-show="route.query.type === 'food'" label="味道简介">
              <el-input
                v-model="form.desc"
                type="text"
                :rows="4"
                style="width: 300px"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item :label="`${type}简介`">
              <el-input
                v-model="form.content"
                style="width: 400px"
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item label="文章介绍">
              {{ form.article }}
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="goBack">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, type UploadProps } from 'element-plus';
import { resources } from '@/services/index';
import { cookie, getProvincesOptions, beforeUpload } from '@/utils';

const router = useRouter();
const route = useRoute();
const uploadUrl = 'http://localhost:3000/api/upload/resource';
const form: any = reactive({
  name: '',
  img: '',
  city: '',
  desc: '',
  content: '',
  article: ''
});
const options = getProvincesOptions();
const label = ref('美食名称');
const op = ref('创建');
const type = ref('美食');
onMounted(() => {
  label.value = route.query.type === 'food' ? '美食名称' : '景点名称';
  op.value = route.params.id === 'create' ? '创建' : '编辑';
  type.value = route.query.type === 'food' ? '美食' : '景点';
  console.log(route.query);
  if (route.params.id === 'edit') {
    for (const key in form) {
      form[key] = route.query[key];
    }
  }
});

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.img = `http://localhost:3000${response.data}`;
};
const beforeAvatarUpload = beforeUpload;
const onSubmit = () => {
  const params: any = { ...form };
  params.type = route.query.type;
  params.img = form.img.replace('http://localhost:3000', '');
  console.log(form);
  if (route.params.id === 'edit') {
    resources.updateSource(params).then(
      (res) => {
        ElMessage.success('更新成功');
        goBack();
      },
      (err) => {
        ElMessage.error(err.message);
      }
    );
  } else if (route.params.id === 'create') {
    resources.createSource(params).then(
      (res) => {
        ElMessage.success('创建成功');
        goBack();
      },
      (err) => {
        ElMessage.error(err.message);
      }
    );
  }
};
const goBack = () => {
  router.back();
};
</script>
<style scoped>
.page {
  width: 100%;
  .pageheader {
    background-color: #ffffff;
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
    height: 90vh;
    overflow-y: scroll;
    scrollbar-width: none;
    background-color: #f5f5f5;
  }
  .form {
    border: #f5f5f5 1px solid;
    border-radius: 16px;
    background-color: #ffffff;
    padding: 12px 20px 0 20px;
  }
}
.avatar-uploader .avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>
