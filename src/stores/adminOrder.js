import { defineStore } from 'pinia'
import api from '@/utils/api'
import { useShopStore } from '@/stores/shop'
import { usePageStore } from '@/stores/page'
import dayjs from 'dayjs'
export const useAdminOrderStore = defineStore('adminOrder', {
  state: () => ({
    orderTypes: [
      {
        id: 1,
        name: 'current'
      }, {
        id: 2,
        name: 'history'
      }, {
        id: 3,
        name: 'remove'
      }],
    adminOrders: []
  }),
  getters: {
  },
  actions: {
    async updateOrderStatus (id, type, oldStatus) {
      const getStatus = (type, status) => {
        const mixStr = `${type}-${status}`
        switch (mixStr) {
        case 'pay-pending':
        case 'prepare-confirmed':
          return 'completed'
        case 'pay-completed':
        case 'prepare-completed':
          return 'pending'
        case 'prepare-pending':
          return 'confirmed'
        }
      }
      const key = type === 'pay' ? 'payStatus' : 'prepareStatus'
      const status = getStatus(type, oldStatus)
      const { order } = await api.patch(`/orders/${id}`, {
        key,
        status
      })
      if (order == null) throw new Error('updateOrderStatus')
      const target = this.adminOrders.find(e => e.id === id)
      target[key] = status
    },
    async fetchAdminOrders (type = 'current') {
      const shopId = useShopStore().shop.id
      const pageStore = usePageStore()
      const { orderBy, orderType, take } = pageStore.pagination
      const params = {
        orderCategory: type,
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
        ownerPhone: o?.owner?.phone,
        isRemove: !!o.deletedAt,
        createdAt: dayjs(o.createdAt).format('YYYY-MM-DD HH:mm:ss')
      }))
    },
    async fetchOrder (shopId, orderId) {
      // const { foods } = await api(`shops/${shopId}/foodTypes/${foodTypeId}/foods`)
      // this.foods = foods
    },
    async deleteOrder (id, timeType) {
      const { order } = await api.delete(`/orders/${id}`)
      if (!order) return
      await this.fetchAdminOrders(timeType)
    }
  }
})
