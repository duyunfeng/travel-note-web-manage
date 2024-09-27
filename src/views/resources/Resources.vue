<template>
  <div>
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称:">
              <el-input v-model="form.name" placeholder="请输入名称" clearable />
            </el-form-item>
            <el-form-item label="省份">
              <el-select v-model="form.provinces">
                <el-option
                  v-for="item in provincesOptions"
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
              <el-button type="primary" @click="importResources('mul')">批量导入</el-button>
              <el-button type="primary" @click="importResources()">导入</el-button>
              <el-button type="primary" @click="addResource">新增</el-button>
              <el-button type="primary" @click="getResource">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="name" label="名称" width="150" />
          <el-table-column prop="img" label="封面" width="120">
            <template #default="scope">
              {{ `localhost:3000${scope.row.img}` }}
              <img :src="`localhost:3000${scope.row.img}`" />
            </template>
          </el-table-column>
          <el-table-column prop="city" label="地址" width="300" />
          <el-table-column prop="description" label="味道简介" width="120" />
          <el-table-column prop="content" label="美食简介" width="120" />
          <el-table-column prop="creatTime" label="创建时间" width="120" />
          <el-table-column prop="updateTime" label="更新时间" width="120" />
          <el-table-column prop="creater" label="创建者" width="120" />
          <el-table-column fixed="right" label="操作" min-width="120">
            <template #default>
              <el-button link type="primary" size="small" @click="viewDetails">
                查看详情
              </el-button>
              <el-button link type="primary" size="small" @click="editResource">编辑</el-button>
              <el-button link type="primary" size="small" @click="viewOperationHistory">
                查看操作记录
              </el-button>
              <el-button link type="primary" size="small" @click="deleteResource">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, defineProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { resources } from '@/services/index';
import { getProvincesOptions } from '@/utils';

const tableData = ref([]);
const router = useRouter();
const route = useRoute();
const form = reactive({
  name: '',
  provinces: '',
  citys: ''
});
const provincesOptions = getProvincesOptions();
const type = route.name === 'foodInformation' ? 'food' : 'travel';
const addResource = () => {
  console.log(route.name, type);
  router.push({
    name: 'addResource',
    params: { id: 'create' },
    query: { type }
  });
};

const getResource = () => {
  resources.getSource({ type }).then((res) => {
    console.log(res);
    tableData.value = res.data.map((item: any) => {
      item.creatTime = new Date(item.creatTime);
      item.updateTime = new Date(item.updateTime);
      return item;
    });
  });
  console.log('查询');
};

const importResources = (type?: string) => {
  if (type === 'mul') {
    console.log('批量导入');
  } else {
    console.log('导入');
  }
};
const viewDetails = () => {
  console.log('查看详情');
};
const editResource = () => {
  console.log('编辑');
};
const viewOperationHistory = () => {
  console.log('查看操作记录');
};
const deleteResource = () => {
  console.log('删除');
};
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
</style>
