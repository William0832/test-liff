

import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isAuth: false,
    isLoading: false,
    alertTypes: ['ok', 'ng'],
    alert: {
      isShow: false,
      type: 'ok',
      msg: '',
    }
    
  }),
  getters: {
  },
  actions: {
    async login(account, psw) {
      this.isAuth = true
    },
    logout () {
      this.isAuth = false
    }
  }
})