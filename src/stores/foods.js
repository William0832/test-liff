import { defineStore } from 'pinia'
import api from '@/utils/api'
export const useFoodStore = defineStore('food', {
  state: () => ({
    foods: [],
    foodTypes: [],
    activeFoodTypeIndex: null,
    activeFoodId: null
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
    }
  }
})
