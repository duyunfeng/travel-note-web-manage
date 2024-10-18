<template>
  <div>
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称:">
              <el-input v-model="form.name" placeholder="请输入名称" clearable />
            </el-form-item>
            <el-form-item label="Id:">
              <el-input v-model="form.id" placeholder="请输入Id" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="addArticle">新增</el-button>
              <el-button type="primary" @click="getArticle">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="table">
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
          <template #img="scope">
            <div class="img-container">
              <el-image
                class="img"
                preview-teleported
                :src="scope.scope.img"
                :initial-index="scope.scope.index"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="srcList"
                fit="contain"
              />
            </div>
          </template>
          <template #default="scope">
            <el-tag :type="scope.scope.statusType">{{ scope.scope.statusLabel }}</el-tag>
          </template>
          <template #op="table">
            <el-button link type="primary" size="small" @click="editArticle(table.scope)"
              >编辑</el-button
            >
            <el-button
              v-if="table.scope.status === 0"
              link
              type="primary"
              size="small"
              @click="openAuditArticles(table.scope)"
              >审核</el-button
            >
            <el-button
              v-if="table.scope.status !== 3"
              link
              type="primary"
              size="small"
              @click="viewOperationHistory(table.scope)"
            >
              查看操作记录
            </el-button>
            <el-popconfirm title="确定删除资源吗？" @confirm="deleteArticle(table.row)">
              <template #reference>
                <el-button v-if="true" link type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </Table>
      </div>
    </div>
  </div>
  <AuditUser :isOpen="isOpen" :isArticle="true" @update:isOpen="auditArticles" :row="auditContent">
    <template #auditContent>
      <PreArticle
        :title="auditContent.name"
        :content="auditContent.content"
        :user="auditContent.creater"
      />
    </template>
  </AuditUser>
  <Dialog
    :opTabale="opTableVisible"
    :name="'article'"
    :row="tableRow"
    @update:opTabale="opTableVisible = $event"
  />
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { articles } from '@/services/index';
import { formatDate } from '@/utils/index';
import type { StatusTagType, PageType } from '@/types/index';

const opTableVisible = ref(false);
const tableData = ref([]);
const router = useRouter();
const form = reactive({
  name: '',
  id: '',
  provinces: '',
  city: ''
});
const pageData: PageType = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
});
const tableRow: any = reactive({});
const auditContent: any = reactive({
  name: '',
  content: '',
  creater: ''
});
const isOpen = ref(false);
const srcList: Array<any> = reactive([]);
const columns = ref([
  {
    prop: 'name',
    label: '名称',
    width: '120',
    fixed: true,
    show: true,
    showOverflowTooltip: false
  },
  {
    prop: 'id',
    label: 'Id',
    width: '80',
    show: true,
    showOverflowTooltip: false
  },
  {
    prop: 'img',
    label: '封面',
    width: '140',
    isSlot: true,
    show: true,
    name: 'img',
    showOverflowTooltip: false
  },
  {
    prop: 'desc',
    label: '文章简介',
    width: '120',
    show: true,
    showOverflowTooltip: true
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
    prop: 'creater',
    label: '创建者',
    width: '80',
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
const addArticle = () => {
  router.push({
    name: 'addArticles',
    params: { id: 'create' }
  });
};

const getArticle = () => {
  const params = {
    name: form.name,
    id: form.id
  };
  articles.getArticle(params).then((res) => {
    pageData.total = res.data.length;
    tableData.value = res.data.map((item: any, key: number) => {
      const statusLabel: StatusTagType = {
        0: '未审核',
        1: '已审核',
        2: '已拒绝',
        3: '草稿'
      };
      const objectType: StatusTagType = {
        0: 'info',
        1: 'success',
        2: 'danger',
        3: 'warning'
      };
      item.index = key;
      item.createTime = formatDate(new Date(item.createTime));
      item.updateTime = formatDate(new Date(item.updateTime));
      item.statusLabel = statusLabel[item.status as keyof StatusTagType];
      item.statusType = objectType[item.status as keyof StatusTagType];
      // item.img = `http://localhost:3000${item.img}`;
      // srcList.push(item.img);
      return item;
    });
  });
};
const editArticle = (row: any) => {
  sessionStorage.setItem('article', JSON.stringify(row));
  router.push({
    name: 'addArticles',
    params: { id: 'edit' }
  });
};
const viewOperationHistory = (row: any) => {
  for (const key in row) {
    tableRow[key] = row[key];
  }
  opTableVisible.value = true;
};
const deleteArticle = (row: any) => {
  articles.deleteArticle(row.id).then((res) => {
    ElMessage.success('删除成功');
    getArticle();
  });
};
const openAuditArticles = (row: any) => {
  for (const key in row) {
    auditContent[key] = row[key];
  }
  isOpen.value = true;
};
const auditArticles = (payload: any) => {
  const params = {
    ...payload,
    auditDesc: payload.desc || ''
  };
  articles.auditArticle(params).then(() => {
    ElMessage.success('审核成功');
    getArticle();
  });
  isOpen.value = false;
};
const handlePageData = (val: number, type: keyof PageType) => {
  pageData[type] = val;
  getArticle();
};
onMounted(() => {
  getArticle();
});
</script>
<style scoped>
.content {
  padding: 20px 20px 0;
  height: 100%;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.img-container {
  position: relative;
  overflow: hidden;
}
.img {
  position: relative;
  width: 100px;
  height: 100px;
  z-index: 999;
}
.el-tooltip__popper.is-dark {
  max-width: 70vw;
  margin: 0 auto;
}
</style>
