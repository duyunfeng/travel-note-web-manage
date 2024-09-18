<template>
    <div class="personal">
        <div><h2>个人中心</h2></div>
        <div class="form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="头像:" class="avatar">
                    <el-avatar :size="50" :src="circleUrl" />
                    <el-upload class="ml15" type="primary" @click="uploadAvatar">
                        <el-button type="primary">上传头像</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="昵称:">
                    <el-input style="width: 225px;" v-model="form.name" />
                </el-form-item>
            <el-form-item label="用户名:">
                {{ username }}
            </el-form-item>
            <el-form-item label="我的签名:">
                <el-input v-model="form.signature" type="textarea" />
            </el-form-item>
            <el-form-item label="性别:" label-position="secret">
                <el-radio-group v-model="form.gender" aria-label="label position">
                    <el-radio-button value="male">男</el-radio-button>
                    <el-radio-button value="female">女</el-radio-button>
                    <el-radio-button value="secret">保密</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-date-picker
                    v-model="form.birthday"
                    type="date"
                />
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const form = reactive({
    name: '',
    gender: 'secret',
    birthday: '',
    signature: ''
})
</script>
<style scoped>
.personal {
    padding: 20px;
    width: 100%;
    height: 100%;
}
.content {
    padding: 20px 20px 0;
}
.avatar {
    display: flex;
    align-items: center;
}
</style>