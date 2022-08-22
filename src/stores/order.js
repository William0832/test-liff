import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    cart: {
      items: [],
      comment: '',
      bookingTime: ''
    },
    order: {
      orderId: null
    }
  }),
  getters: {
    cartTotalMoney(state) {
      return state.cart.items.reduce((sum, curr) => sum + curr?.totalPrice, 0)
    },
    cartItemLen(state) {
      return state.cart.items.length
    }
  },
  actions: {
  },
})