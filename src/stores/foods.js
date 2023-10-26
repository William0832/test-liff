import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/utils/api'
import { useShopStore } from './shop'
import { usePageStore } from './page'
import { debug, ng } from '../utils/swal'
import { useGlobalStore } from './global'

const defaultFoodForEdited = {
  foodTypeId: null,
  name: '',
  info: '',
  price: 0,
  isSoldOut: false,
  img: {
    path: '',
    file: null
  }
}
Object.freeze(defaultFoodForEdited)
export const useFoodStore = defineStore('food', {
  state: () => ({
    foods: [],
    foodTypes: [],
    activeFoodTypeId: null,
    foodForEdited: {
      foodTypeId: null,
      name: '',
      info: '',
      price: 0,
      isSoldOut: false,
      img: {
        path: '',
        file: null
      }
    }
  }),
  actions: {
    initFoodForEdited () {
      this.foodForEdited = {
        ...defaultFoodForEdited
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
      try {
        const pageStore = usePageStore()
        const { take, orderBy, orderType } = pageStore.pagination
        const params = { take, skip: pageStore.skip, orderBy, orderType }
        const url = `shops/${shopId}/foodTypes/${foodTypeId}/foods`
        const { foods, total } = await api(url, { params })
        this.activeFoodTypeId = +foodTypeId
        pageStore.setMax(total)
        this.foods = foods
      } catch (err) {
        ng('no fetchFoods')
      }
    },
    async fetchFood (foodId) {
      const shopId = useShopStore().shop.id
      const { food } = await api(`shops/${shopId}/foods/${foodId}`)

      this.foodForEdited = {
        ...food,
        img: {
          ...defaultFoodForEdited.img,
          ...food.img
        }
      }
    },
    async createFood (payload) {
      const globalStore = useGlobalStore()
      if (globalStore.isLoading) return
      const shopId = useShopStore().shop.id
      if (shopId == null) throw new Error('Create food, need shopId')
      payload = { ...payload, shopId }
      const food = await api.post(`shops/${shopId}/foods`, payload)
      return food
    },
    async updateFood (payload) {
      const globalStore = useGlobalStore()
      if (globalStore.isLoading) return
      const {
        id: foodId,
        name, info, price, isSoldOut, img
      } = payload
      const shopId = useShopStore().shop.id
      if (shopId == null) throw new Error('Update food, need shopId')
      if (img.file !== null) {
        const data = new FormData()
        data.append('img', img.file)
        if (img?.id) {
          data.append('imgId', img.id)
        }
        const foodImg = await api.post(`shops/${shopId}/foods/${foodId}/imgs`, data
          , { header: { 'Content-Type': 'multipart/form-data' } })
        console.log({ foodImg })
      }
      const apiPayload = { foodId, name, info, price, isSoldOut }
      if (shopId == null) throw new Error('Update food, need shopId')
      const food = await api.put(`shops/${shopId}/foods/${foodId}`, apiPayload)
      return food
    },
    async deleteFood (foodId) {
      const globalStore = useGlobalStore()
      if (globalStore.isLoading) return
      try {
        const shopId = useShopStore().shop.id
        await api.delete(`shops / ${shopId} / foods / ${foodId}`)
        await this.fetchFoods(shopId, this.activeFoodTypeId)
      } catch (err) {
        console.log(err)
        ng('delete error')
      }
    },
    async submitFood (type) {
      if (type === 'create') {
        await this.createFood(this.foodForEdited)
      }
      if (type === 'update') {
        await this.updateFood(this.foodForEdited)
      }
    },
    async updateSoldOut (foodId, value) {
      if (foodId == null || foodId === '') throw new Error('updateSoldOut:need foodId')
      const shopId = useShopStore().shop.id
      if (shopId == null) throw new Error('updateSoldOut: need shopId')
      const { food } = await api.patch(`shops/${shopId}/foods/${foodId}`, { colName: 'isSoldOut', value })
      if (!food) throw new Error('updateSoldOut')

      const target = this.foods.find(f => +f.id === +foodId)
      target.isSoldOut = food.isSoldOut
    }
  }
})
