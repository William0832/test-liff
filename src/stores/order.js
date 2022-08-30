import { defineStore } from 'pinia'
import { v4 as uid } from 'uuid'
import api from '@/utils/api'

import storage from '@/utils/storage'
const STORAGE_CART_NAME = 'ohiyo-cart'
const defaultCart = {
  items: [],
  special: '',
  bookingDate: null,
  totalPrice: 0,
}

Object.freeze(defaultCart)


export const useOrderStore = defineStore('order', {
  state: () => ({
    cart: {
     ...defaultCart
    },
    order: {
      orderId: null,
      bookingDate: null,
      totalPrice: 0,
      customer: {
        name: 'William Test',
        lineName: 'William Test',
        lineId: 'test123456',
        phone: '0987654321'
      }
    }
  }),
  getters: {
    isHasMainCourse: (state) => !!state.cart.items.find(e => e.type === '主餐'),
    cartTotalMoney(state) {
      return state.cart.items?.reduce((sum, curr) => sum + (curr?.itemPrice || 0) * curr.amount, 0)
    },
    cartItemLen(state) {
      return state.cart.items?.length
    },
    getItemInfoTexts: (state) => {
      return (item) => {
        const { addItems, special, spicyLevel, type } = item
        let result = []
        if (spicyLevel) result.push(`辣度: ${spicyLevel}`)
        if (addItems) result.push(`加料: ${addItems.map(e => e.name).join(', ')}`)
        if (special) result.push(`特別需求: ${special}`)
        return result
      }
    }
  },
  actions: {
    readCart () {
      const cart = storage.read(STORAGE_CART_NAME) || { ...defaultCart }
      if(cart) this.cart = cart
    },
    removeItem(cartId) {
      if (!cartId) throw new Error('no cartId')
      const item = this.cart.items.find(e => e.cartId === cartId)
      if (!item) throw new Error('no item')
      const { amount, itemPrice } = item
      const oldItemPrice = amount * itemPrice
      this.totalPrice -= - oldItemPrice
      this.cart.items = this.cart.items.filter(e => e.cartId !== cartId)
      storage.update(STORAGE_CART_NAME, this.cart)
    },
    addItemAmount(cartId, add) {
      if (!cartId) throw new Error('no cartId')
      const item = this.cart.items.find(e => e.cartId === cartId)
      if (!item) throw new Error('no item')
      const { amount, itemPrice } = item
      const newAmount = amount + add
      item.amount = newAmount < 1 ? 1 : newAmount
      const oldItemPrice = amount * itemPrice
      this.totalPrice = this.totalPrice - oldItemPrice + newAmount * itemPrice
    },
    addToCart(order) {
      const { id, name, amount, option, special, totalPrice, type, price } = order
      const singleItemPrice = totalPrice / amount
      this.cart.totalPrice += totalPrice
      const checkOptionIsSame = (cartItem, option) => {
        const { type, spicyLevel, addItems } = cartItem
        if (type === '飲料') return true
        if (spicyLevel === (option?.spicyLevel || null)) return true
        const addItemsStr = JSON.stringify(option?.addItems.map(e => ({ id: e.id, name: e.name, price: e.price })) || null)
        if (JSON.stringify(addItems) === addItemsStr) return true
        return false
      }
      const handleSmeOrder = ((order) => {
        const cartOldItem = this.cart.items.find(e => e.itemId === id
          && e.itemPrice === singleItemPrice
          && e.special === special
          && checkOptionIsSame(e, option)
        )
        if (!cartOldItem) return false
        cartOldItem.amount += amount
        return true
      })(order)
      if (handleSmeOrder) return
      this.cart.items.push({
        cartId: uid(),
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
      storage.update(STORAGE_CART_NAME, this.cart)

    },
    async confirmOrder () {
      const payload = {
        customer: this.order.customer,
        cart: this.cart
      }
      
      const res = await api.post('/orders', payload)
      console.log(res)
    }
  },
})