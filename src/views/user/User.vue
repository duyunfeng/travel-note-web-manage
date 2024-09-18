<template>
    <div class="user">
        <div><h2>用户管理</h2></div>
        <div class="content">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="用户名:">
                    <el-input v-model="form.userName" placeholder="请输入用户名" clearable />
                </el-form-item>
                <el-form-item label="昵称:">
                    <el-input v-model="form.name" placeholder="请输入昵称" clearable />
                </el-form-item>
                <el-form-item label="审核状态">
                    <el-select v-model="form.status">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="creat">新增用户</el-button>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="mt20">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column fixed prop="userName" label="用户名" width="150" />
                    <el-table-column prop="name" label="昵称" width="120" />
                    <el-table-column prop="state" label="审核状态" width="120" />
                    <el-table-column prop="creatTime" label="创建时间" width="120" />
                    <el-table-column fixed="right" label="操作" min-width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">
                        审核
                        </el-button>
                        <el-button link type="primary" size="small">编辑</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {reactive} from 'vue'

const form = reactive({ userName: '', name: '', status: '' })
const options = [
    { value: 'all', label: '全部' },
    { value: 'true', label: '已审核' },
    { value: 'false', label: '未审核' }
]
const tableData = [
    {userName: 'admin', name: 'admin', state: 'true', creatTime: '2022-01-01'}
]
const onSubmit = () => {
    console.log(form)
    console.log('submit!')
}

const resetForm = () => {
    form.userName = ''
    form.name = ''
    form.status = ''
    console.log(form)
}
</script>
<style scoped>
.user {
    padding: 20px;
    width: 100%;
    height: 100%;
}
.content {
    padding: 20px 20px 0;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>