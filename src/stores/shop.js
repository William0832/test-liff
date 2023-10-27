import { defineStore } from 'pinia'
import api from '@/utils/api'
import { debug } from '../utils/swal'
import { ref, computed } from 'vue'
const checkTimeIsBetweenRange = (startStr, endStr) => {
  const now = new Date()
  const start = now.setHours(...startStr.split(':'))
  const end = now.setHours(...endStr.split(':'))
  return now >= start && now <= end
}
export const useShopStore = defineStore('shop', () => {
  const shop = ref({
    id: 1,
    name: 'Ohiyo 樂屋',
    info: '海邊好吃炒泡麵',
    phone: '0987654321',
    address: 'address',
    imgs: ['./images/ohiyoMenu.jpg'],
    isRegular: true,
    isOpen: false, // changeBy nowState(getter)
    activeTime: [
      { dayId: 1, dayName: '星期一', activeTime: '休息中' },
      { dayId: 2, dayName: '星期二', activeTime: '休息中' },
      { dayId: 3, dayName: '星期三', activeTime: '休息中' },
      { dayId: 4, dayName: '星期四', activeTime: '休息中' },
      { dayId: 5, dayName: '星期五', activeTime: '休息中' },
      { dayId: 6, dayName: '星期六', activeTime: '11:00-14:00' },
      { dayId: 0, dayName: '星期日', activeTime: '11:00-14:00' }
    ]
  })
  const nowState = computed(() => {
    const currentDayId = new Date().getUTCDay()
    const currentActiveTime = shop.value
      .activeTime[currentDayId].activeTime
    return !shop.value.isRegular
      ? shop.value.isOpen ? '營業中' : '休息中'
      : currentActiveTime === '休息中'
        ? '休息中'
        : checkTimeIsBetweenRange(...currentActiveTime.split(':'))
          ? '營業中'
          : '休息中'
  })
  async function fetchShop (id) {
    try {
      const { shop: shopData } = await api(`shops/${id}`, { params: { includeFoods: 'true' } })
      const {
        id: shopId, name, address,
        phone, info, openStatus, activeSchedule
      } = shopData
      const { weekDayOpenTimes } = activeSchedule
      this.shop = {
        ...this.shop,
        id: shopId,
        name,
        address,
        phone,
        info,
        isRegular: openStatus === 'bySchedule',
        activeTime: this.shop.activeTime.map(e => ({
          ...e,
          activeTime: weekDayOpenTimes.find(item => item.weekDay === e.dayId)?.openTime || '休息中'
        }))
      }
    } catch (err) {
      debug(err)
    }
  }
  return { shop, nowState, fetchShop }
})
