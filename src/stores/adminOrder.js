import { defineStore } from 'pinia'
import api from '@/utils/api'
import { useShopStore } from '@/stores/shop'
import { usePageStore } from '@/stores/page'
export const useAdminOrderStore = defineStore('adminOrder', {
  state: () => ({
    orderTypes: [
      {
        id: 1,
        name: 'current'
      }, {
        id: 2,
        name: 'history'
      }],
    adminOrders: []
  }),
  getters: {
  },
  actions: {
    async updateOrderStatus (id, type) {
      const order = this.adminOrders.find(e => e.id === id)
      const key = type === 'pay' ? 'payStatus' : 'prepareStatus'
      if (type === 'pay') {
        if (order.payStatus === 'pending') {
          order.payStatus = 'completed'
          return
        }
        order.payStatus = 'pending'
        return
      }
      if (order.prepareStatus === 'pending') {
        order.prepareStatus = 'confirmed'
        return
      }
      if (order.prepareStatus === 'confirmed') {
        order.prepareStatus = 'completed'
        return
      }
      order.prepareStatus = 'pending'
    },
    async fetchAdminOrders (timeType = 'current') {
      const shopId = useShopStore().shop.id
      const pageStore = usePageStore()
      const { orderBy, orderType, take } = pageStore.pagination
      const params = {
        timeType,
        orderBy,
        orderType,
        take,
        skip: pageStore.skip
      }
      const { total, orders } = await api('/orders', { params })
      pageStore.setMax(total)
      this.adminOrders = orders.map(o => ({
        ...o,
        ownerName: o?.owner?.name,
        ownerPhone: o?.owner?.phone
      }))
    },
    async fetchOrder (shopId, orderId) {
      // const { foods } = await api(`shops/${shopId}/foodTypes/${foodTypeId}/foods`)
      // this.foods = foods
    }
  }
})
