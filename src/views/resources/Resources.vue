<template>
  <div>
    <div>
      <h2>{{ title }}</h2>
    </div>
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
          <el-table-column prop="pic" label="图片" width="120" />
          <el-table-column prop="provinces" label="所属省份" width="120" />
          <el-table-column prop="city" label="所属城市" width="120" />
          <el-table-column prop="address" label="地址" width="300" />
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
import { reactive, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { provinces } from './provinces';
const props = defineProps({
  title: String,
  tableData: []
});
const router = useRouter();
const form = reactive({
  name: '',
  provinces: '',
  citys: ''
});
const provincesOptions = provinces.map((item) => {
  return {
    value: item.code,
    label: item.name
  };
});

const addResource = () => {
  router.push({
    name: 'addResource',
    params: { id: 'create' },
    query: { type: 'food' }
  });
  console.log('新增资源');
};

const getResource = () => {
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
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
