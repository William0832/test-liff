import { defineStore } from 'pinia'
import api from '@/utils/api'
import { useShopStore } from '@/stores/shop'
import { usePageStore } from '@/stores/page'
import dayjs from 'dayjs'
const defaultFilter = {
  userName: '',
  food: '',
  payStatus: '',
  prepareStatus: ''
}
export const useAdminOrderStore = defineStore('adminOrder', {
  state: () => ({
    selectedList: [],
    filter: {
      ...defaultFilter
    },
    orderTypes: [
      {
        id: 1,
        name: 'today'
      }, {
        id: 2,
        name: 'history'
      }, {
        id: 3,
        name: 'remove'
      }],
    adminOrders: [],
    alerts: [
      // { id: 2, type: 'new', info: '新訂單 $120', time: '2023-10-25 20:00:00', isRead: true }
    ]
  }),
  getters: {
    isRowSelected () {
      return (id) => this.selectedList.includes(id)
    },
    isAllSelected () {
      return this.selectedList.length === 0
        ? false
        : this.adminOrders.every(o => this.selectedList.includes(o.id))
    },
    selectedLen () {
      return this.selectedList.length
    },
    newAlertLength () {
      return this.alerts.filter(e => e.isRead === false).length
    }
  },
  actions: {
    resetSelected () {
      this.selectedList = []
    },
    selectedToggle (id) {
      if (this.selectedList.includes(id)) {
        this.selectedList = this.selectedList.filter(e => e !== id)
        return
      }
      this.selectedList.push(id)
    },
    allSelectedToggle () {
      if (this.isAllSelected) {
        this.selectedList = this.selectedList.filter(id =>
          !this.adminOrders.map(e => e.id).includes(id))
        return
      }
      const listSet = new Set([...this.selectedList, ...this.adminOrders.map(e => e.id)])
      this.selectedList = [...listSet]
    },
    async updateOrderStatus (id, type, oldStatus, moneyPayload) {
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
      let payload = {
        key,
        status
      }
      if (moneyPayload) payload = { ...payload, ...moneyPayload }
      const { order } = await api.patch(`/orders/${id}`, payload)
      if (order == null) throw new Error('updateOrderStatus')
      const target = this.adminOrders.find(e => e.id === id)
      target[key] = status
    },
    async fetchAdminOrders (type = 'today') {
      const shopId = useShopStore().shop.id
      const pageStore = usePageStore()
      const { orderBy, orderType, take } = pageStore.pagination
      const params = {
        orderCategory: type,
        orderBy,
        orderType,
        take,
        skip: pageStore.skip,
        ...this.filter
      }
      const { total, orders } = await api('/orders', { params })
      pageStore.setMax(total)
      this.adminOrders = orders.map(o => ({
        ...o,
        ownerName: o?.owner?.name,
        ownerPhone: o?.owner?.phone,
        isRemove: !!o.deletedAt,
        createdAt: dayjs(o.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        selected: false
      }))
    },
    async deleteOrder (id, timeType) {
      const { order } = await api.delete(`/orders/${id}`)
      if (!order) return
      await this.fetchAdminOrders(timeType)
    },
    resetFilter () {
      this.filter = { ...defaultFilter }
    },
    addSocketAlert (payload) {
      this.alerts = [
        { ...payload },
        ...this.alerts
      ]
    }
  }
})
