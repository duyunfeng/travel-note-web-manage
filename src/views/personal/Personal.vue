<template>
  <div class="personal">
    <div><h2>个人中心</h2></div>
    <div class="form">
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="头像:" class="avatar">
          <el-avatar :size="50" :src="form.avatar" />
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            action="http://localhost:3000/api/upload"
            :headers="{
              Authorization: `Bearer ${JSON.parse(cookie.get('token') || '')}`
            }"
            :before-upload="beforeAvatarUpload"
            name="image"
            class="ml15"
            type="primary"
          >
            <el-button type="primary">上传头像</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称:">
          <el-input style="width: 225px" v-model="form.name" />
        </el-form-item>
        <el-form-item label="用户名:">
          {{ form.userName }}
        </el-form-item>
        <el-form-item label="Id:">
          {{ form.id }}
        </el-form-item>
        <el-form-item label="我的签名:">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio-group v-model="form.sex" aria-label="label position">
            <el-radio-button value="male">男</el-radio-button>
            <el-radio-button value="female">女</el-radio-button>
            <el-radio-button value="secret">保密</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="form.birthday" type="date" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { personal } from '../../services/index';
import { ElMessage } from 'element-plus';
import type { UploadProps } from 'element-plus';
import { cookie } from '../../utils/index';

const form = reactive({
  name: '',
  userName: '',
  sex: 'secret',
  birthday: '',
  desc: '',
  avatar: '',
  id: ''
});
let personalData = reactive([]);
const getPersonal = () => {
  const params = {
    id: (personalData[0] as any)._id || ''
  };
  personal
    .getPersonal(params)
    .then((res) => {
      for (const key in form) {
        (form as any)[key] = res.data[key];
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
};
onMounted(() => {
  personalData = JSON.parse(localStorage.getItem('user') ?? '');
  getPersonal();
});
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.avatar = URL.createObjectURL(uploadFile.raw!);
};
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};

const uploadAvatar = () => {};
</script>
<style scoped>
.personal {
  padding: 20px;
  width: 100%;
  height: 100%;
}
.form {
  padding: 20px 20px 0;
}
.avatar {
  display: flex;
  align-items: center;
}
</style>
