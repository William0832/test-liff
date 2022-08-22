import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    isStartToOrder: false,
    text: '',
    menuEl: null,
    menuItemEl: null,
    cart: []
  }),
  getters: {
  },
  actions: {
    registerMenuEl(el) {
      this.menuEl = el
    },
    menuScrollToShow() {
      this.menuEl.scrollIntoView({ behaver: 'smooth' })
    }
  },
})