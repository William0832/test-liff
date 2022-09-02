import { defineStore } from 'pinia'
import api from '@/utils/api'
export const useAdminOrderStore = defineStore('adminOrder', {
  state: () => ({
    adminOrders: []
  }),
  getters: {
  },
  actions: {
    async fetchOrders (shopId, timeType='current') {
      const res = await api('/orders', { params: { timeType }} )
      console.log(res)
      // this.adminOrders = orders
    },
    async fetchOrder (shopId, orderId) {
      // const { foods } = await api(`shops/${shopId}/foodTypes/${foodTypeId}/foods`)
      // this.foods = foods
    }
  }
})