<template>
  <div>
    <div class="content">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-row>
          <el-col :span="24">
            <el-form-item label="用户名:">
              <el-input v-model="form.userName" placeholder="请输入用户名" clearable />
            </el-form-item>
            <el-form-item label="Id:">
              <el-input v-model="form.id" placeholder="请输入id" clearable />
            </el-form-item>
            <el-form-item label="昵称:">
              <el-input v-model="form.name" placeholder="请输入昵称" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
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
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="openCreateUser">新增用户</el-button>
              <el-button type="primary" @click="getUser">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="mt20">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="userName" label="用户名" width="150" />
          <el-table-column prop="name" label="昵称" width="120" />
          <el-table-column prop="id" label="Id" width="120" />
          <el-table-column prop="statusLabel" label="审核状态" width="120" />
          <el-table-column prop="role" label="角色" width="120" />
          <el-table-column prop="createTime" label="创建时间" width="120" />
          <el-table-column prop="updateTime" label="更新时间" width="120" />
          <el-table-column fixed="right" label="操作" min-width="200">
            <template #default="user">
              <el-button
                v-if="user.row.status !== 1"
                link
                type="primary"
                size="small"
                @click="openAuditUser(user.row)"
              >
                审核
              </el-button>
              <el-popconfirm title="确定重置密码吗？" @confirm="resetPasswrod(user.row)">
                <template #reference>
                  <el-button link type="primary" size="small"> 重置密码 </el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm title="确定删除用户吗？" @confirm="deleteUser(user.row)">
                <template #reference>
                  <span v-if="user.row.userName === 'admin'">
                    <el-tooltip effect="dark" content="无权限" placement="top-start">
                      <el-button
                        :disabled="user.row.userName === 'admin'"
                        link
                        type="primary"
                        size="small"
                        >删除</el-button
                      >
                    </el-tooltip>
                  </span>
                  <el-button
                    v-else
                    :disabled="user.row.userName === 'admin'"
                    link
                    type="primary"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <CreatUser title="创建用户" :isOpen="isOpen" @update:isOpen="creatUser" />
  <AuditUser title="审核用户" :isOpen="isShow" @update:isOpen="auditUser" :row="userRow" />
</template>
<script lang="ts" setup>
import CreatUser from './CreatUser.vue';
import AuditUser from './AuditUser.vue';
import { ref, reactive, onMounted } from 'vue';
import { user } from '../../services/index';
import { ElMessage } from 'element-plus';

const form = reactive({ userName: '', name: '', status: '', id: '' });
const isOpen = ref(false);
const isShow = ref(false);
const tipShow = ref(false);
let userRow = reactive({});
const options = [
  { value: '', label: '全部' },
  { value: '0', label: '未审核' },
  { value: '1', label: '已审核' },
  { value: '2', label: '已拒绝' }
];
const tableData = ref([]);

onMounted(async () => {
  await getUser();
});

const reset = () => {
  form.userName = '';
  form.name = '';
  form.status = '';
  form.id = '';
  getUser();
};

const openCreateUser = () => {
  isOpen.value = true;
};
const openAuditUser = (row: any) => {
  console.log(row);
  isShow.value = true;
  userRow = row;
};
const getUser = () => {
  const params = {
    userName: form.userName,
    name: form.name,
    status: form.status,
    id: form.id
  };
  user.getUser(params).then((res) => {
    tableData.value = res.data.map((item: any) => {
      const statusArr = ['未审核', '已审核', '已拒绝'];
      return {
        ...item,
        role: item.role === 'user' ? '普通用户' : '管理员',
        statusLabel: statusArr[item.status],
        createTime: new Date(item.createTime),
        updateTime: new Date(item.updateTime)
      };
    });
  });
};

const deleteUser = (row: any) => {
  user.deleteUser(row._id).then((res) => {
    if (res.code === 200) {
      ElMessage.success('删除成功');
      getUser();
    }
  });
};

const creatUser = (payload: any) => {
  if (payload.isCreat) {
    user.creatUser(payload.form).then(
      () => {
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
const auditUser = (payload: any) => {
  if (payload.isUpdate) {
    user.updateUser(payload.form).then(
      () => {
        getUser();
        isShow.value = false;
      },
      (err) => {
        ElMessage.error(err.message);
      }
    );
  } else {
    isShow.value = false;
  }
};
const resetPasswrod = (row: any) => {
  user.resetPassword({ _id: row._id }).then(
    (res: any) => {
      if (res.code === 200) {
        ElMessage.success('重置成功');
      }
    },
    (err) => ElMessage.error(err.message)
  );
};
</script>
<style scoped>
.content {
  padding: 0 20px;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
