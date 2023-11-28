import { defineStore } from 'pinia'
import { v4 as uid } from 'uuid'
import api from '@/utils/api'
import { useShopStore } from '@/stores/shop'
import storage from '@/utils/storage'
import { useUserStore } from './user'
import { socket } from '@/utils/io'
import { ng, ok } from '../utils/swal'
import { orderFlexMsg } from '../utils/liffFlexMsg'

const STORAGE_CART_NAME = 'ohiyo-cart'
const defaultCart = {
  items: [],
  special: '',
  bookingDate: null,
  totalPrice: 0
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
        name: '',
        lineName: '',
        lineId: '',
        phone: ''
      }
    },
    orderInfo: {

    },
    historyOrder: {
      orders: [],
      cursorId: null,
      isEmpty: false
    }
  }),
  getters: {
    isHasMainCourse: (state) => !!state.cart.items.find(e => e.type === '主餐'),
    cartTotalMoney (state) {
      return state.cart.items?.reduce((sum, curr) => sum + (curr?.itemPrice || 0) * curr.amount, 0)
    },
    cartItemLen (state) {
      return state.cart.items?.length
    },
    getItemInfoTexts: (state) => {
      return (item) => {
        const { addItems, special, spicyLevel, type } = item
        const result = []
        if (spicyLevel) result.push(`辣度: ${spicyLevel}`)
        if (addItems) result.push(`加料: ${addItems.map(e => e.name).join(', ')}`)
        if (special) result.push(`特別需求: ${special}`)
        return result
      }
    },
    sortCartItems: (state) => {
      return state.cart.items.sort((a, b) => a.type.localeCompare(b.type))
    }
  },
  actions: {
    async fetchHistoryOrders ({ userId, take = 5, cursorId }) {
      if (this.historyOrder.isEmpty) return
      const payload = {
        userId,
        take,
        cursorId: cursorId || this.historyOrder.cursorId
      }
      const { orders } = await api.post('/orders/history', payload)
      if (orders.length === 0) {
        ng('沒有更多資料了')
      }
      if (orders.length === 0 && this.historyOrder.orders === 0) {
        this.historyOrder = { ...this.historyOrder, isEmpty: true }
        return
      }
      this.historyOrder = {
        orders: [...this.historyOrder.orders, ...orders],
        cursorId: [...orders].pop()?.id || this.historyOrder.cursorId,
        isEmpty: false
      }
    },
    async getUser () {
      const userStore = useUserStore()
      // await userStore.getLineUserData()
      const { name, id } = userStore.userData
      this.order.customer = {
        name: name || this.order.customer.name,
        lineName: name || this.order.customer.lineName,
        lineId: id || this.order.customer.lineId,
        phone: this.order.customer.phone || localStorage.getItem('phone') || ''
      }
    },
    readCart () {
      const cart = storage.read(STORAGE_CART_NAME) || { ...defaultCart }
      if (cart) this.cart = cart
    },
    removeItem (cartId) {
      if (!cartId) throw new Error('no cartId')
      const item = this.cart.items.find(e => e.cartId === cartId)
      if (!item) throw new Error('no item')
      const { amount, itemPrice } = item
      const oldItemPrice = amount * itemPrice
      this.cart.totalPrice -= oldItemPrice
      this.cart.items = this.cart.items.filter(e => e.cartId !== cartId)
      storage.update(STORAGE_CART_NAME, this.cart)
    },
    addItemAmount (cartId, add) {
      if (!cartId) throw new Error('no cartId')
      const item = this.cart.items.find(e => e.cartId === cartId)
      if (!item) throw new Error('no item')
      const { amount, itemPrice } = item
      const newAmount = amount + add
      item.amount = newAmount < 1 ? 1 : newAmount
      const oldItemPrice = amount * itemPrice
      this.cart.totalPrice += -oldItemPrice + newAmount * itemPrice
      storage.update(STORAGE_CART_NAME, this.cart)
    },
    addToCart (order) {
      const { id, name, amount, option, special, totalPrice, type, price, spicyLevel } = order
      const singleItemPrice = totalPrice / amount
      this.cart.totalPrice += totalPrice
      const checkOptionIsSame = (cartItem, option) => {
        const { type, spicyLevel, addItems } = cartItem
        if (type === '飲料') {
          option.spicyLevel = null
          option.addItems = null
          return true
        }
        if (spicyLevel !== (option?.spicyLevel || null)) return false
        const addItemsStr = JSON.stringify(option?.addItems.map(e => ({ id: e.id, name: e.name, price: e.price })) || null)
        if (JSON.stringify(addItems) !== addItemsStr) return false
        return true
      }
      const handleSmeOrder = ((order) => {
        const cartOldItem = this.cart.items.find(
          e => e.itemId === id &&
            e.itemPrice === singleItemPrice &&
            e.special === special &&
            checkOptionIsSame(e, option)
        )
        if (!cartOldItem) return false
        cartOldItem.amount += amount
        return true
      })(order)
      if (handleSmeOrder) {
        storage.update(STORAGE_CART_NAME, this.cart)
        return
      }
      this.cart.items.push({
        cartId: uid(),
        price,
        amount,
        itemId: id,
        name,
        type,
        itemPrice: singleItemPrice,
        addItems: option?.addItems.map(e => ({ id: e.id, name: e.name, price: e.price })) || null,
        spicyLevel: type === '飲料' ? null : option?.spicyLevel,
        special
      })
      storage.update(STORAGE_CART_NAME, this.cart)
    },
    updateCart (cartId, order) {
      const { amount, option, special, totalPrice, type } = order
      const target = this.cart.items.find(e => e.cartId === cartId)
      const singleItemPrice = totalPrice / amount

      this.cart.totalPrice += amount * (singleItemPrice - target.itemPrice)
      target.amount = amount
      target.special = special
      target.itemPrice = singleItemPrice
      target.addItems = option?.addItems.map(e => ({ id: e.id, name: e.name, price: e.price })) || null
      target.spicyLevel = type === '飲料' ? null : option?.spicyLevel

      storage.update(STORAGE_CART_NAME, this.cart)
    },
    async confirmOrder () {
      if (this.order.customer.name === '') {
        ng('請輸入姓名！')
        return
      }
      if (this.order.customer.phone === '') {
        ng('請輸入手機號碼！')
        return
      }
      if (this.order.customer.phone === '') {
        ng('手機號碼格式不正確！')
        return
      }
      localStorage.setItem('phone', this.order.customer.phone)
      const payload = {
        customer: this.order.customer,
        cart: this.cart,
        shopId: useShopStore().shop.id
      }
      const { order } = await api.post('/orders', payload)
      if (order !== null) {
        this.removeCart()
        socket.emit('MSG', {
          type: 'new',
          id: order.id,
          value: `新訂單 $${order.totalPrice}`,
          isRead: false,
          time: new Date()
        })
      }
      const msg = orderFlexMsg(order)
      // `成功下單! 訂單編號: ${order.id}`
      await Promise.all([
        useUserStore().sendMsg(msg),
        useUserStore().sendMsg({ type: 'text', text: `--orderId: ${order.id}` })
      ])
      return order
    },
    async fetchOrder (id) {
      const { order } = await api.get(`/orders/${id}`)
      this.orderInfo = order
      return order
    },
    async deleteOrder (id, index) {
      const { order } = await api.delete(`/orders/${id}`)
      this.historyOrder.orders[index].deletedAt = order.deletedAt
      ok('訂單已刪除！')
    },
    removeCart () {
      this.cart = { ...defaultCart }
      storage.update(STORAGE_CART_NAME, this.cart)
    }
  }
})
