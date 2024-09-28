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
              <el-button type="primary" @click="importResources('mul')">批量导入</el-button>
              <el-button type="primary" @click="addResource">新增</el-button>
              <el-button type="primary" @click="getResource">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%" max-height="600">
          <el-table-column fixed prop="name" label="名称" width="120" />
          <el-table-column fixed prop="id" label="Id" width="80" />
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
          <el-table-column prop="desc" label="味道简介" width="120" />
          <el-table-column prop="content" show-overflow-tooltip label="美食简介" width="120" />
          <el-table-column prop="createTime" label="创建时间" width="120" />
          <el-table-column prop="updateTime" label="更新时间" width="120" />
          <el-table-column prop="creater" label="创建者" width="120" />
          <el-table-column fixed="right" label="操作" min-width="200">
            <template #default="table">
              <el-button link type="primary" size="small" @click="editResource(table.row)"
                >编辑</el-button
              >
              <el-button link type="primary" size="small" @click="viewOperationHistory">
                查看操作记录
              </el-button>
              <el-button link type="primary" size="small" @click="deleteResource">删除</el-button>
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
  <el-dialog v-model="dialogVisible" title="批量导入" width="500">
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost:3000/api/upload/mulResource"
      :headers="{
        Authorization: `Bearer ${JSON.parse(cookie.get('token') || '')}`
      }"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽文件到此处或者 <em>点击选择文件上传</em></div>
    </el-upload>
  </el-dialog>
</template>
<script lang="ts" setup>
import ElPaginationComponent from '@/components/ElPaginationComponent.vue';
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
const dialogVisible = ref(false);
const srcList: Array<any> = reactive([]);
const provincesOptions = getProvincesOptions();
const type = route.name === 'foodInformation' ? 'food' : 'travel';
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

const importResources = (type?: string) => {
  if (type === 'mul') {
    dialogVisible.value = true;
    console.log('批量导入');
  } else {
    console.log('导入');
  }
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
const viewOperationHistory = () => {
  console.log('查看操作记录');
};
const deleteResource = () => {
  console.log('删除');
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
