<template>
  <div>
    <el-dialog v-model="uploadDialog" title="批量导入" width="500">
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
    <el-dialog v-model="opTableDialog" title="查看日志" width="600">
      <div class="table">
        <el-table :data="tableData" border style="width: 100%" max-height="800">
          <el-table-column prop="time" label="时间" width="160" />
          <el-table-column prop="op" label="操作类型" width="120" />
          <el-table-column prop="content" label="内容" width="160" />
          <el-table-column prop="creater" label="操作者" />
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, computed, watch } from 'vue';
import { cookie } from '@/utils/index';
import { getLog } from '@/services/index';

const props = defineProps({
  upload: {
    type: Boolean,
    default: false
  },
  opTabale: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  row: {
    type: Object,
    default: () => {}
  }
});

const tableData = ref([]);
const total = ref(0);
watch(props.row, (val) => {
  if (val.id) {
    getLog({ id: val.id, name: props.name }).then((res: any) => {
      console.log(res);
      tableData.value = res.data.map((item: any) => {
        item.op = item.op.replace(/\[|\]/, ' ');
        return item;
      });
      total.value = res.total;
    });
  }
  console.log(val);
});
const emit = defineEmits(['update:upload', 'update:opTabale']);

const uploadDialog = computed({
  get: () => props.upload,
  set: (val: boolean) => emit('update:upload', val)
});
const opTableDialog = computed({
  get: () => props.opTabale,
  set: (val: boolean) => emit('update:opTabale', val)
});
</script>
<style scoped>
.table {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
