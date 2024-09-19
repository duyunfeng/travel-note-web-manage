<template>
  <el-dialog v-model="props.isOpen" title="审核" width="400" :before-close="cannelClick">
    <el-form :model="form">
      <el-form-item label="审核" label-width="80px">
        <el-select style="width: 220px;" v-model="form.status">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
      </el-form-item>
      <el-form-item label="描述" label-width="80px">
        <el-input style="width: 220px;" type="textarea" v-model="form.desc" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cannelClick">取消</el-button>
        <el-button type="primary" @click="updateStstua"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
const payload = {
  isUpdate: false,
  form: null
};
const props = defineProps({
  isOpen: Boolean,
  row: Object
});
const options = [
  { value: '1', label: '审核通过' },
  { value: '2', label: '审核不通过' }
];
const form = reactive({
  status: '',
  desc: ''
});
const emit = defineEmits(['close']);
const reset = () => {
  form.status = '';
  form.desc = '';
};
const cannelClick = () => {
  payload.isUpdate = false;
  reset();
  emit('close', payload);
};
const updateStstua = () => {
  payload.isUpdate = true;
  payload.form = form;
  payload.form._id = props.row.value._id;
  emit('close', payload);
  reset();
};
</script>
