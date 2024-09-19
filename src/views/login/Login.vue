<template>
  <div class="page-login">
    <div class="login-container">
      <div class="logo">
        <img src="../../assets/logo.png" alt="Logo" />
        <div class="name">
          <span v-for="text in app.info.name" :key="text">{{ text }}</span>
        </div>
      </div>

      <p class="desc">旅行日记后台管理</p>

      <div class="login-form">
        <el-form label-position="top" class="login-form" :disabled="saving">
          <el-form-item label="用户名">
            <input
              v-model="form.userName"
              placeholder="请输入用户名"
              maxlength="20"
              type="text"
              :readonly="readonly"
              autocomplete="off"
              @focus="readonly = false"
            />
          </el-form-item>
          <el-form-item label="密码">
            <input
              v-model="form.password"
              placeholder="请输入密码"
              maxlength="20"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <!-- <el-form-item label="验证码">
            <input
              v-model="form.password"
              placeholder="请输入验证码"
              maxlength="4"
              @keyup.enter="toLogin"
            />
          </el-form-item> -->
          <div class="op">
            <el-button type="primary" :loading="saving" @click="toLogin">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="bg">
      <img src="./statics/bg.svg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import router from '../../router/index';
import { login, user } from '../../services/index.ts';

const app = {
  info: {
    name: ['A', 'D', 'M', 'I', 'N']
  }
};
const saving = ref(false);
const readonly = ref(true);
const form = reactive({
  userName: '',
  password: ''
});
const toLogin = () => {
  if (!form.userName) {
    return ElMessage.error('请输入用户名');
  }
  if (!form.password) {
    return ElMessage.error('请输入密码');
  }

  // TODO: 登录
  saving.value = true;
  login.login(form).then(
    (res) => {
      saving.value = false;
      if (res.code === 200) {
        user.getUser({userName: form.userName}).then(
          (res) => {
            router.push('/');
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(res.data));
          },
          (err) => ElMessage.error(err.message)
        );
      }
      return ElMessage.success(res.message);
    },
    (err) => {
      saving.value = false;
      return ElMessage.error(err.message);
    }
  );
};
</script>
<style lang="scss" scoped>
$color: #2c3142;

.page-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: #fff;
  color: $color;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 90%;
    pointer-events: none;
    transform: rotate(180deg) scaleY(-1);
  }

  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 9;

    .logo {
      height: 50px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      img {
        height: 46px;
        background-color: $color;
        border-radius: 50px;
        border: 3px solid $color;
        margin-right: 10px;
      }

      span {
        display: inline-block;
        font-size: 38px;
        font-weight: bold;
        line-height: 1;
        letter-spacing: 3px;

        &:nth-child(1) {
          animation: dou 1s infinite linear;
        }
      }
    }

    .desc {
      font-size: 15px;
      letter-spacing: 1px;
      margin-bottom: 50px;
    }

    .login-form {
      width: 300px;

      :deep(.el-form) {
        .el-form-item {
          margin-bottom: 20px;
        }

        .el-form-item__label {
          padding-left: 5px;
        }

        input {
          height: 45px;
          width: 100%;
          box-sizing: border-box;
          font-size: 17px;
          border: 0;
          border-radius: 0;
          background-color: #f8f8f8;
          padding: 0 15px;
          border-radius: 6px;
          position: relative;

          &:-webkit-autofill {
            box-shadow: none;
            -webkit-box-shadow: 0 0 0 1000px #f8f8f8 inset;
            box-shadow: 0 0 0 1000px #f8f8f8 inset;
          }

          &::placeholder {
            font-size: 14px;
          }
        }
      }
    }

    .op {
      display: flex;
      justify-content: center;
      margin-top: 40px;

      :deep(.el-button) {
        height: 45px;
        width: 100%;
        font-size: 15px;
        border-radius: 6px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
