import { defineStore } from 'pinia'
import api from '@/utils/api'
import { useShopStore } from './shop'
import { debug } from '../utils/swal'
const foodForEdited = {
  foodTypeId: null,
  name: '',
  info: '',
  price: 0,
  isSoldOut: false,
  img: null
}
Object.freeze(foodForEdited)
export const useFoodStore = defineStore('food', {
  state: () => ({
    pagination: {
      take: 5,
      max: 1,
      page: 1,
      orderBy: 'id',
      orderType: 'asc'
    },
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
    },
    skip (state) {
      const { page, take } = state.pagination
      return take * (page - 1)
    }
  },
  actions: {
    initFoodForEdited () {
      this.foodForEdited = {
        ...foodForEdited
      }
    },
    async fetchFoodTypes (shopId) {
      try {
        const { foodTypes } = await api(`shops/${shopId}/fetchFoodsByTypes`)
        this.foodTypes = foodTypes
      } catch (err) {
        debug(err)
      }
    },
    async fetchFoods (shopId, foodTypeId) {
      const { take, orderBy, orderType } = this.pagination
      const query = Object.entries({ take, skip: this.skip, orderBy, orderType })
        .map(([k, v]) => `${k}=${v}`).join('&')
      const url = `shops/${shopId}/foodTypes/${foodTypeId}/foods?${query}`
      const { foods, total } = await api(url)
      this.pagination.max = Math.ceil(total / this.pagination.take)
      this.foods = foods
    },
    async fetchFood (foodId) {
      const shopId = useShopStore().shop.id
      const { food } = await api(`shops/${shopId}/foods/${foodId}`)
      this.foodForEdited = { ...food }
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
        debug(err)
      }
    },
    async submitFood (type) {
      if (type === 'create') {
        console.log('create')
        console.log(this.foodForEdited)
        return
      }
      if (type === 'update') {
        console.log('update')
        console.log(this.foodForEdited)
      }
    }
  }
})
