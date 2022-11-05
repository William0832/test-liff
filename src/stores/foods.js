import { defineStore } from 'pinia'
import api from '@/utils/api'
import { useShopStore } from './shop'
export const useFoodStore = defineStore('food', {
  state: () => ({
    foods: [],
    foodTypes: [],
    activeFoodTypeIndex: null,
    activeFoodId: null,
    foodForEdited: {
      foodTypeId: null,
      name: '',
      info: '',
      price: 0,
      isSoldOut: false,
      img: null
    }
  }),
  getters: {
    activeFood (state) {
      return state.foods.find(e => e.id === state.activeFoodId)
    }
  },
  actions: {
    async fetchFoodTypes (shopId) {
      const { foodTypes } = await api(`shops/${shopId}/fetchFoodsByTypes`)
      this.foodTypes = foodTypes
    },
    async fetchFoods (shopId, foodTypeId) {
      const { foods } = await api(`shops/${shopId}/foodTypes/${foodTypeId}/foods`)
      this.foods = foods
    },
    async fetchFood (foodId) {
      const shopId = useShopStore().shop.id
      const { food } = await api(`shops/${shopId}/foods/${foodId}`)
      this.foodForEdited = food
    },
    async createFood (payload) {
      const shopId = useShopStore().shop.id
      if (shopId == null) throw new Error('Create food, need shopId')
      payload = { ...payload, shopId }
      const food = await api.post(`shops/${shopId}/foods`, payload)
      return food
    },
    async delete (foodId) {
      try {
        const shopId = useShopStore().shop.id
        const res = api.delete(`shops/${shopId}/foods/${foodId}`)
        this.foods = this.foods.filter(e => e.id !== foodId)
      } catch (err) {
        console.log(err)
      }
    }
  }
})
