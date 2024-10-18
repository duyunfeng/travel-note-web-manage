<template>
  <el-dialog v-model="modelIsOpen" title="审核" :width="modelWidth" :before-close="cannelClick">
    <div class="audit">
      <slot name="auditContent" class="slot"></slot>
      <el-form :model="form" class="auditForm">
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
          <el-input
            style="width: 220px"
            type="textarea"
            v-model="form.desc"
            :rows="6"
            resize="none"
          />
        </el-form-item>
      </el-form>
    </div>
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
const payload: any = reactive({
  isUpdate: false,
  status: 0,
  desc: '',
  id: ''
});
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  row: {
    type: Object
  },
  isArticle: {
    type: Boolean,
    default: false
  }
});
const modelIsOpen = computed({
  get() {
    return props.isOpen;
  },
  set() {
    reset();
  }
});
const modelWidth = computed(() => {
  return props.isArticle ? '800' : '500';
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
  emit('update:isOpen', payload);
};
const updateStstua = () => {
  payload.isUpdate = true;
  payload.status = form.status;
  payload.desc = form.desc;
  payload.id = props?.row?.id || '';
  emit('update:isOpen', payload);
};
</script>
<style scoped>
.audit {
  display: flex;
  align-items: center;
  max-height: 750px;
}
.slot {
  flex: 1;
}
.auditForm {
  flex: 1;
}
</style>
