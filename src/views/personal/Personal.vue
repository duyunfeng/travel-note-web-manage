<template>
  <div class="personal">
    <div><h2>个人中心</h2></div>
    <div class="form">
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="头像:" class="avatar">
          <el-avatar :size="50" :src="form.avatar" />
          <el-upload class="ml15" type="primary" @click="uploadAvatar">
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
        <el-form-item label="性别:" label-position="secret">
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
import { reactive, onMounted } from 'vue'
import { personal } from '../../services/index';
import { ElMessage } from 'element-plus';
const form = reactive({
  name: '',
  userName:'',
  sex: 'secret',
  birthday: '',
  desc: '',
  avatar:'',
  id: ''
})
let personalData = reactive([])
const getPersonal = () => {
  const params = {
    id: personalData[0]._id || ''
  }
  personal.getPersonal(params).then(
    (res) => {
    console.log('personal', form)
    console.log(res)
  }).catch((err) => {
    ElMessage.error(err.message)
  })
}
onMounted(() => {
  personalData = JSON.parse(localStorage.getItem('user')??'');
  getPersonal()
})

const uploadAvatar =  () => {
  getPersonal()
}
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
