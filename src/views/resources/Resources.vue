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
            <el-form-item label="省份">
              <el-select v-model="form.city" clearable>
                <el-option
                  v-for="item in provincesOptions"
                  filterable
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-link
                v-if="false"
                class="mr12"
                href="http://121.37.10.32:3000/public/static/template/resource.xlsx"
                :headers="{
                  Authorization: `Bearer ${token}`
                }"
                target="_blank"
                download
              >
                <el-button type="primary">下载模板</el-button>
              </el-link>
              <el-button v-if="false" type="primary" @click="importResources">批量导入</el-button>
              <el-button type="primary" @click="addResource">新增</el-button>
              <el-button type="primary" @click="getResource">查询</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
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
          <template #op="table">
            <el-button link type="primary" size="small" @click="editResource(table.scope)"
              >编辑</el-button
            >
            <el-button link type="primary" size="small" @click="viewOperationHistory(table.scope)">
              查看操作记录
            </el-button>
            <el-popconfirm title="确定删除资源吗？" @confirm="deleteResource(table.scope)">
              <template #reference>
                <el-button link type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </Table>
      </div>
    </div>
  </div>
  <Dialog
    :upload="dialogVisible"
    :opTabale="opTableVisible"
    :name="'resource'"
    :row="tableRow"
    @update:opTabale="opTableVisible = $event"
    @update:upload="dialogVisible = $event"
  />
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { resources } from '@/services/index';
import { getProvincesOptions, formatDate } from '@/utils';
import { useLoginStore } from '@/stores/login';
import type { PageType } from '@/types';

const { token } = useLoginStore();
const tableData = ref([]);
const router = useRouter();
const route = useRoute();
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
const dialogVisible = ref(false);
const opTableVisible = ref(false);
const srcList: Array<any> = reactive([]);
const provincesOptions = getProvincesOptions();
const type = route.name === 'foodInformation' ? 'food' : 'site';
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
    prop: 'cityLabel',
    label: '地址',
    width: '120',
    show: true,
    showOverflowTooltip: false
  },
  {
    prop: 'desc',
    label: '味道简介',
    width: '120',
    show: type === 'food',
    showOverflowTooltip: true
  },
  {
    prop: 'content',
    label: '美食简介',
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
const addResource = () => {
  router.push({
    name: 'addResource',
    params: { id: 'create' },
    query: { type }
  });
};

const getResource = () => {
  const params = {
    name: form.name,
    id: form.id,
    city: form.city,
    type: type,
    page: pageData.currentPage,
    pageSize: pageData.pageSize
  };
  resources.getSource(params).then((res: any) => {
    pageData.total = res.total;
    tableData.value = res.data.map((item: any, key: number) => {
      item.index = key;
      item.createTime = formatDate(new Date(item.createTime));
      item.updateTime = formatDate(new Date(item.updateTime));
      item.cityLabel = provincesOptions.find((ele) => item.city === ele.value)?.label;
      item.img = `http://localhost:3000${item.img}`;
      srcList.push(item.img);
      return item;
    });
  });
};

const importResources = () => {
  dialogVisible.value = true;
};
const editResource = (row: any) => {
  router.push({
    name: 'addResource',
    params: { id: 'edit' },
    query: { ...row, type }
  });
};
const viewOperationHistory = (row: any) => {
  for (const key in row) {
    tableRow[key] = row[key];
  }
  opTableVisible.value = true;
};
const deleteResource = (row: any) => {
  resources.deleteSource(row.id).then((res) => {
    getResource();
  });
};
const handlePageData = (val: number, type: keyof PageType) => {
  pageData[type] = val;
  getResource();
};
const reset = () => {
  form.name = '';
  form.id = '';
  form.provinces = '';
  pageData.currentPage = 1;
  pageData.pageSize = 10;
  getResource();
};
onMounted(() => {
  getResource();
});
</script>
<style scoped>
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
.table {
  margin-bottom: 20px;
}
.el-tooltip__popper.is-dark {
  max-width: 70vw;
  margin: 0 auto;
}
</style>
