<template>
  <div>
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
      <div class="btn-group">
        <el-button type="primary" @click="test">测试</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, watch } from 'vue';
import { personal } from '../../services/index';
import { ElMessage } from 'element-plus';
import type { UploadProps } from 'element-plus';
import { cookie } from '../../utils/index';

const form = reactive({
  name: '',
  userName: '',
  sex: 'secret',
  birthday: new Date(),
  desc: '',
  avatar: '',
  id: ''
});
const getPersonal = () => {
  personal
    .getPersonal()
    .then((res) => {
      console.log(res);
      for (const key in form) {
        if (key === 'avatar') {
          form.avatar = `http://localhost:3000${res.data.avatar}`;
        } else if (key === 'birthday') {
          form.birthday = new Date(Number(res.data.birthday));
        } else {
          (form as any)[key] = res.data[key];
        }
      }
      console.log(form);
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
};
onMounted(() => {
  getPersonal();
});
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  console.log(response);
  form.avatar = `http://localhost:3000${response.data.avatar}`;
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

const test = () => {
  const user = JSON.parse(localStorage.getItem('user') || '');
  console.log(user);
  form.avatar = `http://localhost:3000/avatar/${user.userName}/1.jpg`;
};
const save = () => {
  const params = {
    name: form.name,
    sex: form.sex,
    birthday: new Date(form.birthday).getTime(),
    desc: form.desc,
    avatar: form.avatar.replace('http://localhost:3000', '')
  };
  console.log(params);
  personal
    .updatePersonal(params)
    .then((res) => {
      console.log(res);
      getPersonal();
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
};
</script>
<style scoped>
.form {
  padding: 20px 20px 0;
}
.avatar {
  display: flex;
  align-items: center;
}
</style>
