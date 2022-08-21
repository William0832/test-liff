import { defineStore } from 'pinia'
const checkTimeIsBetweenRange = (startStr, endStr) => {
  const now = new Date()
  const start = now.setHours(...startStr.split(':'))
  const end = now.setHours(...endStr.split(':'))
  return now >= start && now <= end

}
export const useShopStore = defineStore('shop', {
  state: () => ({
    shop: {
      name: 'Ohiyo 樂屋',
      info: '海邊好吃炒泡麵',
      phone: '0987654321',
      address: 'address',
      imgs: ['https://fakeimg.pl/200'],
      isRegular: true,
      isOpen: false,
      activeTime: [
        { dayId: 1, dayName: '星期一', activeTime: '休息中' },
        { dayId: 2, dayName: '星期二', activeTime: '休息中' },
        { dayId: 3, dayName: '星期三', activeTime: '休息中' },
        { dayId: 4, dayName: '星期四', activeTime: '休息中' },
        { dayId: 5, dayName: '星期五', activeTime: '休息中' },
        { dayId: 6, dayName: '星期六', activeTime: '11:00-14:00' },
        { dayId: 0, dayName: '星期日', activeTime: '11:00-14:00' },
      ]
    }
  }),
  getters: {
    nowState(state) {
      const currentDayId = new Date().getUTCDay()
      const currentActiveTime = state.shop
        .activeTime[currentDayId].activeTime
      return !state.shop.isRegular
        ? state.shop.isOpen ? '營業中' : '休息中'
        : currentActiveTime === '休息中'
          ? '休息中'
          : checkTimeIsBetweenRange(...currentActiveTime.split(':'))
            ? '營業中' : '休息中'
    }
  },
  actions: {
  },
})