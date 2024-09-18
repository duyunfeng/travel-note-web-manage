<template>
  <el-drawer v-model="props.isOpen" direction="rtl" :before-close="handleClick">
    <template #header>
      <h4>{{ props.title }}</h4>
    </template>
    <template #default>
      <div class="form">
        <el-form
          ref="ruleFormRef"
          :model="form"
          label-width="auto"
          style="max-width: 600px"
          :rules="rules"
        >
          <el-form-item label="账号:" prop="userName">
            <el-input style="width: 225px" v-model="form.userName" />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input style="width: 225px" type="password" v-model="form.password" />
          </el-form-item>
          <el-form-item label="确认密码:" prop="checkPass">
            <el-input style="width: 225px" type="password" v-model="form.checkPass" />
          </el-form-item>
          <el-form-item label="昵称:">
            <el-input style="width: 225px" v-model="form.name" />
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cannelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
const props = defineProps({
  isOpen: Boolean,
  title: String
});
const payload = {
  isCreat: false,
  form: null
};
const ruleFormRef = ref<FormInstance>();
interface RuleForm {
  userName: string;
  password: string;
  checkPass: string;
  name: string;
}
const form = reactive<RuleForm>({
  userName: '',
  password: '',
  checkPass: '',
  name: ''
});
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if (form.checkPass !== '') {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField('checkPass');
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== form.password) {
    callback(new Error('两次密码不匹配'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof form>>({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }]
});
const emit = defineEmits(['close']);

const reset = () => {
  form.name = '';
  form.userName = '';
  form.password = '';
  form.checkPass = '';
};
const cannelClick = () => {
  payload.isCreat = false;
  reset();
  emit('close', payload);
};

const confirmClick = () => {
  payload.isCreat = true;
  payload.form = form;
  emit('close', payload);
  if (!props.isOpen) {
    reset();
  }
};

const handleClick = () => {
  payload.isCreat = false;
  reset();
  emit('close', payload);
};
</script>
