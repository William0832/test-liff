import { defineStore } from 'pinia'
import api from '@/utils/api'
import { useShopStore } from '@/stores/shop'
import { usePageStore } from '@/stores/page'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const defaultFilter = {
  userName: '',
  food: '',
  payStatus: '',
  prepareStatus: ''
}
export const useAdminOrderStore = defineStore('adminOrder', () => {
  const route = useRoute()
  const selectedList = ref([])
  const filter = ref({
    ...defaultFilter
  })
  const orderTypes = ref([
    {
      id: 1,
      name: 'today'
    }, {
      id: 2,
      name: 'history'
    }, {
      id: 3,
      name: 'remove'
    }]
  )
  const adminOrders = ref([])
  const alerts = ref([])
  const isRowSelected = computed(() => {
    return (id) => selectedList.value.includes(id)
  })
  const isAllSelected = computed(() => {
    return selectedList.value.length === 0
      ? false
      : adminOrders.value.every(o => selectedList.value.includes(o.id))
  })
  const selectedLen = computed(() => {
    return selectedList.value.length
  })
  const newAlertLength = computed(() => {
    return alerts.value.filter(e => e.isRead === false).length
  })

  const resetSelected = () => {
    selectedList.value = []
  }
  const selectedToggle = (id) => {
    if (selectedList.value.includes(id)) {
      selectedList.value = selectedList.value.filter(e => e !== id)
      return
    }
    selectedList.value.push(id)
  }
  const allSelectedToggle = () => {
    if (isAllSelected.value) {
      selectedList.value = selectedList.value.filter(id =>
        !adminOrders.value.map(e => e.id).includes(id))
      return
    }
    const listSet = new Set([...selectedList.value, ...adminOrders.value.map(e => e.id)])
    selectedList.value = [...listSet]
  }
  const updateOrderStatus = async (id, type, oldStatus, moneyPayload) => {
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
    const target = adminOrders.value.find(e => e.id === id)
    target[key] = status
  }
  const fetchAdminOrders = async (type = 'today') => {
    const shopId = useShopStore().shop.id
    const pageStore = usePageStore()
    const { orderBy, orderType, take } = pageStore.pagination
    const params = {
      orderCategory: type,
      orderBy,
      orderType,
      take,
      skip: pageStore.skip,
      ...filter.value
    }
    const { total, orders } = await api('/orders', { params })
    pageStore.setMax(total)
    adminOrders.value = orders.map(o => ({
      ...o,
      ownerName: o?.owner?.name,
      ownerPhone: o?.owner?.phone,
      isRemove: !!o.deletedAt,
      createdAt: dayjs(o.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      selected: false
    }))
  }
  const deleteOrder = async (id, timeType) => {
    const { order } = await api.delete(`/orders/${id}`)
    if (!order) return
    await fetchAdminOrders(timeType)
  }
  const resetFilter = () => {
    filter.value = { ...defaultFilter }
  }
  const addSocketAlert = async (payload) => {
    alerts.value = [
      { ...payload },
      ...alerts.value
    ]

    const { name, params } = route
    if (name === 'OrderTypes') {
      const { orderType } = params
      await fetchAdminOrders(orderType)
    }
  }
  return {
    selectedList,
    filter,
    orderTypes,
    adminOrders,
    alerts,
    isRowSelected,
    isAllSelected,
    selectedLen,
    newAlertLength,
    resetSelected,
    selectedToggle,
    allSelectedToggle,
    updateOrderStatus,
    fetchAdminOrders,
    deleteOrder,
    resetFilter,
    addSocketAlert
  }
})
