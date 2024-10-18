import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {

  const isAuthenticated = ref(false);
  const token = ref('')
  const changeIsAuthent = (val: boolean) => {
    isAuthenticated.value = val
  }

  const setToken = (val: string) => {
    token.value = val
  }

  const logout = () => {
    isAuthenticated.value = false
    token.value = ''
  }
  return {isAuthenticated, token, changeIsAuthent, setToken, logout }
}, {persist: true})
