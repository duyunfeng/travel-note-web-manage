import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref();
  const personalInfo = ref();
  const isDark = ref(false);
  const setUserInfo = (data: any) => {
    userInfo.value = data;
  }

  const changeDark = (val: boolean) => {
    isDark.value = val;
  }

  const setPersonal = (data: any) => {
    personalInfo.value = data
    personalInfo.value.avatar = `http://localhost:3000${data.avatar}` || '';
    personalInfo.value.birthday = new Date(Number(data.birthday));
  }
  
  const logout = () => {
    userInfo.value = null;
    personalInfo.value = null;
  }

  return {userInfo, personalInfo, isDark, setUserInfo, setPersonal, logout, changeDark }
}, {
  persist: true
})
