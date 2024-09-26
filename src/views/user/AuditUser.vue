<template>
  <el-dialog v-model="modelIsOpen" title="审核" width="400" :before-close="cannelClick">
    <el-form :model="form">
      <el-form-item label="审核" label-width="80px">
        <el-select style="width: 220px" v-model="form.status">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" label-width="80px">
        <el-input style="width: 220px" type="textarea" v-model="form.desc" />
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
import { reactive, computed } from 'vue';
const payload: any = {
  isUpdate: false,
  form: null
};
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  row: {
    type: Object
  }
});
const modelIsOpen = computed({
  get() {
    return props.isOpen;
  },
  set(value) {
    if (!value) {
      payload.isUpdate = value;
      reset();
      emit('update:isOpen', payload);
    }
  }
});
const options = [
  { value: '1', label: '审核通过' },
  { value: '2', label: '审核不通过' }
];
const form = reactive({
  status: '',
  desc: ''
});
const emit = defineEmits(['update:isOpen']);
const reset = () => {
  form.status = '';
  form.desc = '';
};
const cannelClick = () => {
  modelIsOpen.value = false;
};
const updateStstua = () => {
  payload.isUpdate = true;
  payload.form = form;
  payload.form._id = props.row._id;
  emit('update:isOpen', payload);
  reset();
};
</script>
