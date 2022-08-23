import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    cart: {
      items: [],
      special: '',
      bookingTime: '',
      totalPrice: 0,
    },
    order: {
      orderId: null
    }
  }),
  getters: {
    cartTotalMoney(state) {
      return state.cart.items?.reduce((sum, curr) => sum + (curr?.itemPrice || 0) * curr.amount, 0)
    },
    cartItemLen(state) {
      return state.cart.items?.length
    }
  },
  actions: {
    addToCart(order) {
      // console.log(order)
      const { id, name, amount, option, special, totalPrice, type, price } = order
      const singleItemPrice = totalPrice / amount
      this.cart.items.push({
        price,
        amount,
        itemId: id,
        name,
        type,
        itemPrice: singleItemPrice,
        addItems: option?.addItems.map(e => ({ id: e.id, name: e.name, price: e.price })) || null,
        spicyLevel: option?.spicyLevel || null,
        special
      })
      // this.cart.special = special
      this.cart.totalPrice += totalPrice
    }
  },
})