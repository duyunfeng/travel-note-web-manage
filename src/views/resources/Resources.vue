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
                class="mr12"
                href="http://localhost:3000/public/static/template/resource.xlsx"
                :headers="{
                  Authorization: `Bearer ${JSON.parse(cookie.get('token') || '')}`
                }"
                target="_blank"
                download
              >
                <el-button type="primary">下载模板</el-button>
              </el-link>
              <el-button type="primary" @click="importResources">批量导入</el-button>
              <el-button type="primary" @click="addResource">新增</el-button>
              <el-button type="primary" @click="getResource">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%" max-height="600">
          <el-table-column fixed prop="name" label="名称" width="120" />
          <el-table-column prop="id" label="Id" width="80" />
          <el-table-column prop="img" label="封面" width="140">
            <template #default="scope">
              <div class="img-container">
                <el-image
                  class="img"
                  preview-teleported
                  :src="scope.row.img"
                  :initial-index="scope.row.index"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="srcList"
                  fit="contain"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cityLabel" label="地址" width="120" />
          <el-table-column prop="desc" v-if="type === 'food'" label="味道简介" width="120" />
          <el-table-column prop="content" show-overflow-tooltip label="美食简介" width="120" />
          <el-table-column prop="createTime" label="创建时间" width="120" />
          <el-table-column prop="updateTime" label="更新时间" width="120" />
          <el-table-column prop="creater" label="创建者" width="120" />
          <el-table-column fixed="right" label="操作" min-width="200">
            <template #default="table">
              <el-button link type="primary" size="small" @click="editResource(table.row)"
                >编辑</el-button
              >
              <el-button link type="primary" size="small" @click="viewOperationHistory(table.row)">
                查看操作记录
              </el-button>
              <el-popconfirm title="确定删除资源吗？" @confirm="deleteResource(table.row)">
                <template #reference>
                  <el-button link type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="fr mt10 mb20">
          <ElPaginationComponent
            :currentPageNumber="pageData.currentPage"
            :pageSizeNumber="pageData.pageSize"
            :total="pageData.total"
          />
        </div>
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
import ElPaginationComponent from '@/components/ElPaginationComponent.vue';
import Dialog from './Dialog.vue';
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { resources } from '@/services/index';
import { getProvincesOptions } from '@/utils';
import { cookie } from '@/utils/index';

const tableData = ref([]);
const router = useRouter();
const route = useRoute();
const form = reactive({
  name: '',
  id: '',
  provinces: '',
  city: ''
});
const pageData = reactive({
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
    type: type
  };
  resources.getSource(params).then((res) => {
    pageData.total = res.data.length;
    tableData.value = res.data.map((item: any, key: number) => {
      item.index = key;
      item.createTime = new Date(item.createTime);
      item.updateTime = new Date(item.updateTime);
      item.cityLabel = provincesOptions.find((ele) => item.city === ele.value)?.label;
      item.img = `http://localhost:3000${item.img}`;
      srcList.push(item.img);
      return item;
    });
  });
};

const importResources = () => {
  dialogVisible.value = true;
  console.log('批量导入');
};
const editResource = (row: any) => {
  console.log('编辑');
  console.log(route.name, type, { ...row, type });
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
  console.log('查看操作记录');
};
const deleteResource = (row: any) => {
  console.log('删除');
  resources.deleteSource(row.id).then((res) => {
    console.log(res);
    ElMessage.success('删除成功');
    getResource();
  });
};
onMounted(() => {
  getResource();
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
</style>
