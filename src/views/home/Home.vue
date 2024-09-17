<template>
  <div>home</div>
  <button @click="removeItem">移除登陆</button>
</template>
<script setup lang="ts">
import router from '../../router/index'
const removeItem = () => {
  console.log('111')
  localStorage.removeItem('isAuthenticated')
  router.push('/login')
}
</script>
