<template>
  <div>
    <div class="form">
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="头像:" class="avatar">
          <el-avatar :size="50" :src="form.avatar" />
          <el-upload
            ref="uploadRef"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            action="http://localhost:3000/api/upload"
            :headers="{
              Authorization: `Bearer ${token}`
            }"
            :auto-upload="false"
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
        <el-button type="primary" @click="changePassword">修改密码</el-button>
        <el-button type="danger" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { personal } from '../../services/index';
import { ElMessage } from 'element-plus';
import type { UploadProps, UploadInstance } from 'element-plus';
import { beforeUpload } from '../../utils/index';
import { useUserStore } from '@/stores/user';
import { useLoginStore } from '@/stores/login';

const { personalInfo, setPersonal } = useUserStore();
const { token } = useLoginStore();
const uploadRef = ref<UploadInstance>();
const form = ref({
  name: '',
  userName: '',
  sex: 'secret',
  birthday: new Date(),
  desc: '',
  avatar: '',
  id: ''
});
onMounted(() => {
  form.value = personalInfo;
});

const getPersonal = () => {
  personal.getPersonal({ id: personalInfo.id }).then((res) => {
    setPersonal(res);
  });
};
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.value.avatar = `http://localhost:3000${response.data.avatar}`;
};
const beforeAvatarUpload = beforeUpload;
const save = async () => {
  await uploadRef.value!.submit();
  const params = {
    name: form.value.name,
    sex: form.value.sex,
    birthday: new Date(form.value.birthday).getTime(),
    desc: form.value.desc,
    avatar: form.value.avatar.replace('http://localhost:3000', '')
  };
  personal
    .updatePersonal(params)
    .then(() => {
      ElMessage.success('保存成功');
      getPersonal();
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
};

const changePassword = () => {
  ElMessage.warning('暂未开放');
};
</script>
<style scoped>
.form {
  padding: 0 20px;
}
.avatar {
  display: flex;
  align-items: center;
}
</style>
