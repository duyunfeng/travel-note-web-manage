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
        <el-form-item>
          <el-button type="primary" @click="creatUser">新增用户</el-button>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="mt20">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="userName" label="用户名" width="150" />
          <el-table-column prop="name" label="昵称" width="120" />
          <el-table-column prop="id" label="Id" width="120" />
          <el-table-column prop="status" label="审核状态" width="120" />
          <el-table-column prop="createTime" label="创建时间" width="120" />
          <el-table-column prop="updateTime" label="更新时间" width="120" />
          <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="user">
              <el-button link type="primary" size="small" @click="handleClick"> 审核 </el-button>
              <el-button link type="primary" size="small">编辑</el-button>
              <el-button link type="primary" size="small" @click="deleteUser(user.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <CreatUser title="创建用户" :isOpen="isOpen" @close="close" />
</template>
<script lang="ts" setup>
import CreatUser from './CreatUser.vue';
import { ref, reactive, onMounted } from 'vue';
import { user } from '../../services/index';
import { ElMessage } from 'element-plus';

const form = reactive({ userName: '', name: '', status: '' });
const isOpen = ref(false);
const options = [
  { value: 'all', label: '全部' },
  { value: 'true', label: '已审核' },
  { value: 'false', label: '未审核' }
];
const tableData = ref([]);

onMounted(async () => {
  await getUser();
});
const query = () => {
  getUser();
};

const reset = () => {
  form.userName = '';
  form.name = '';
  form.status = '';
  console.log(form);
};

const creatUser = () => {
  isOpen.value = true;
};

const getUser = () => {
  user.getUser().then((res) => {
    tableData.value = res.data.map((item) => {
      return {
        ...item,
        status: item.status ? '已审核' : '未审核',
        createTime: new Date(item.createTime),
        updateTime: new Date(item.updateTime)
      };
    });
  });
};

const deleteUser = (row) => {
  user.deleteUser(row._id).then((res) => {
    if (res.code === 200) {
      ElMessage.success('删除成功');
      getUser();
    }
  });
};

const close = (payload) => {
  if (payload.isCreat) {
    user.creatUser(payload.form).then(
      (res) => {
        getUser();
        isOpen.value = false;
      },
      (err) => {
        ElMessage.error(err.message);
      }
    );
  } else {
    isOpen.value = false;
  }
};
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
