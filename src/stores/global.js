
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isAuth: true,
    isLoading: false,
    alertTypes: ['ok', 'ng'],
    alert: {
      isShow: false,
      type: 'ok',
      msg: ''
    }
  }),
  getters: {
  },
  actions: {
    async login (account, psw) {
      if (account !== 'admin' ||
        psw !== import.meta.env.VITE_ADMIN_PSW
      ) throw new Error('login fail')
      this.isAuth = true
    },
    logout () {
      this.isAuth = false
    }
  }
})
