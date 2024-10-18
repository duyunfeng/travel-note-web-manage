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
        <Table
          :data="tableData"
          :columns="columns"
          :currentPageNumber="pageData.currentPage"
          :pageSizeNumber="pageData.pageSize"
          :total="pageData.total"
          :paginationDirection="'right'"
          @update:pageSizeNumber="handlePageData($event, 'pageSize')"
          @update:currentPageNumber="handlePageData($event, 'currentPage')"
        >
          <template #op="scope">
            <el-button
              v-if="scope.scope.status !== 1"
              link
              type="primary"
              size="small"
              @click="openAuditUser(scope.scope)"
            >
              审核
            </el-button>
            <el-popconfirm title="确定重置密码吗？" @confirm="resetPasswrod(scope.scope)">
              <template #reference>
                <el-button link type="primary" size="small"> 重置密码 </el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm title="确定删除用户吗？" @confirm="deleteUser(scope.scope)">
              <template #reference>
                <span class="ml12" v-if="scope.scope.userName === 'admin'">
                  <el-tooltip effect="dark" content="无权限" placement="top-start">
                    <el-button
                      :disabled="scope.scope.userName === 'admin'"
                      link
                      type="primary"
                      size="small"
                      >删除</el-button
                    >
                  </el-tooltip>
                </span>
                <el-button
                  v-else
                  :disabled="scope.scope.userName === 'admin'"
                  link
                  type="primary"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </Table>
      </div>
    </div>
  </div>
  <CreatUser title="创建用户" :isOpen="isOpen" @update:isOpen="creatUser" />
  <AuditUser title="审核用户" :isOpen="isShow" @update:isOpen="auditUser" :row="userRow" />
</template>
<script lang="ts" setup>
import CreatUser from './CreatUser.vue';
import { ref, reactive, onMounted } from 'vue';
import { user } from '../../services/index';
import { ElMessage } from 'element-plus';
import { formatDate } from '@/utils';
import type { PageType } from '@/types';

const form = reactive({ userName: '', name: '', status: '', id: '' });
const isOpen = ref(false);
const isShow = ref(false);
let userRow = reactive({});
const options = [
  { value: '', label: '全部' },
  { value: '0', label: '未审核' },
  { value: '1', label: '已审核' },
  { value: '2', label: '已拒绝' }
];
const tableData = ref([]);
const pageData: PageType = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
});
const columns = ref([
  {
    prop: 'userName',
    label: '用户名',
    width: '150',
    fixed: true,
    show: true,
    showOverflowTooltip: false
  },
  {
    prop: 'name',
    label: '昵称',
    width: '120',
    show: true,
    showOverflowTooltip: false
  },
  {
    prop: 'id',
    label: 'Id',
    width: '120',
    show: true,
    showOverflowTooltip: false
  },

  {
    prop: 'statusLabel',
    label: '审核状态',
    width: '120',
    show: true,
    showOverflowTooltip: true
  },
  {
    prop: 'role',
    label: '角色',
    width: '120',
    show: true,
    showOverflowTooltip: false
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: '180',
    show: true,
    showOverflowTooltip: false
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    width: '180',
    show: true,
    showOverflowTooltip: false
  },
  {
    fixed: 'right',
    label: '操作',
    minWidth: '160',
    isSlot: true,
    show: true,
    prop: 'op',
    name: 'op',
    showOverflowTooltip: false
  }
]);
onMounted(async () => {
  await getUser();
});
const handlePageData = (val: number, type: keyof PageType) => {
  pageData[type] = val;
  getUser();
};

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
  user.getUser(params).then(
    (res) => {
      tableData.value = res.data.map((item: any) => {
        const statusArr = ['未审核', '已审核', '已拒绝'];
        const userRole: { [key: string]: string } = {
          admin: '管理员',
          operator: '审核员',
          user: '普通用户'
        };
        return {
          ...item,
          role: userRole[item.role],
          statusLabel: statusArr[item.status],
          createTime: formatDate(new Date(item.createTime)),
          updateTime: formatDate(new Date(item.updateTime))
        };
      });
    },
    (error) => {
      if (error.code !== 401) {
        ElMessage.error(error.message);
      }
    }
  );
};

const deleteUser = (row: any) => {
  user.deleteUser(row.id).then(
    (res: any) => {
      if (res.code === 200) {
        ElMessage.success('删除成功');
        getUser();
      }
    },
    (error) => {
      ElMessage.error(error.message);
    }
  );
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
    user.updateUser(payload).then(
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
  user.resetPassword({ id: row.id }).then(
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
