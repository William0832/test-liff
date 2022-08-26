import { defineStore } from 'pinia'
import { useOrderStore } from './order'
import { useShopStore } from './shop'
import api from '../api'
const spicyLevels =  [
  {
    id: 1, name: '完全不辣', isDefault: false
  },
  {
    id: 2, name: '微辣(原味)', isDefault: true
  },
  {
    id: 3, name: '加辣', isDefault: false
  },
]
export const useMenuStore = defineStore('menu', {
  state: () => ({
    type: [{
      id: 1,
      name: '主餐',
      info: '',
      isShowOnTabs: true,
      items: [
        { id: 1, typeId: 1, name: '蔬食炒泡麵', price: 120, info: '蔬食炒泡麵', isSaleOut: false, img: '' },
        { id: 2, typeId: 1, name: '蔬食香腸炒泡麵', price: 150, info: '蔬食香腸炒泡麵', isSaleOut: false, img: '' },
      ],
      option: {
        spicyLevels,
        addItems: [
          { id: 1, name: '加麵', price: 20, info: '加麵', isSaleOut: false, img: '' },
          { id: 2, name: '韓式泡菜', price: 20, info: '韓式泡菜', isSaleOut: false, img: '' },
          { id: 3, name: '素香腸', price: 20, info: '素香腸', isSaleOut: false, img: '' },
          { id: 4, name: '雞蛋', price: 20, info: '雞蛋', isSaleOut: false, img: '' },
          { id: 5, name: '菇菇', price: 20, info: '菇菇', isSaleOut: false, img: '' }
        ]
      }
    }, {
      id: 2,
      name: '飲料',
      info: '',
      isShowOnTabs: true,
      items: [
        { id: 3, typeId: 2, name: '檸檬可樂', price: 50, info: '檸檬可樂', isSaleOut: false, img: '' },
        { id: 4, typeId: 2, name: '椰子水', price: 60, info: '椰子水', isSaleOut: false, img: '' },
        { id: 5, typeId: 2, name: '果汁', price: 80, info: '果汁', isSaleOut: false, img: '' },
        { id: 6, typeId: 2, name: '啤酒', price: 60, info: '啤酒', isSaleOut: false, img: '' },
      ]
    }],
    addItems: [],
    currentTabIndex: 0,
    scrollEls: {
      menu: null,
      items: []
    }
  }),
  getters: {
    getPrice() {
      const DRINK_DISCOUNT = 10
      const orderStore = useOrderStore()
      const isHasMainCourse = orderStore.isHasMainCourse
      return ({ type, price }) => {
        if (type === '主餐') return price
        if (type === '飲料') {
          price = isHasMainCourse ? price - DRINK_DISCOUNT : price
          return price > 0 ? price : 0
        }
        console.warn({ type, price })
        return price
      }
    },
    showItem: (state) => (typeId, itemId) => {
      const type = state.type.find(e => e.id === typeId)
      if (!type) return null
      const { items, option } = type
      const item = items.find(e => e.id === itemId)
      if (!item) return null
      return {
        type: type?.name,
        ...item,
        itemId: item?.id,
        option
      }
    },
    showMenuTypes: (state) => state.type?.filter(e => e.isShowOnTabs),
    menuItemEl: (state) => state.scrollEls.items.length !== 0
      ? state.scrollEls.items[state.currentTabIndex]
      : null
  },
  actions: {
    async fetchFoodsByTypes() {
      const shopId = useShopStore().shop.id
      const  { foodTypes } = await api(`shops/${shopId}/fetchFoodsByTypes`)
      console.log(foodTypes) 
      this.addItems = foodTypes
        .find(e => e.name === '主餐加點').foods
        .map( e=> ({
          id: e.id,
          name: e.name,
          info: e.info,
          price: e.price,
          isSoldOut: e.isSoldOut
        }))
      this.type = foodTypes
        .filter( e => e.name !== '主餐加點')
        .map(e => ({
          id: e.id,
          name: e.name,
          isShowOnTabs: true,
          info: e.info,
          option: e.name === '主餐' 
            ? {
              spicyLevels,
              addItems: this.addItems
            } 
            : null,
          items: e.foods.map(e => ({
            id: e.id,
            typeId: e.foodTypeId,
            name: e.name,
            price: e.price,
            info: e.info,
            isSoldOut: e.isSoldOut
          }))
        }))
    },

    fetchItem({ typeId, itemId }) {
      console.log(typeId, itemId)
    },
    registerEl(type, el) {
      this.scrollEls[type] = el
    },
    scrollToShow(type) {
      const el = type === 'menu'
        ? this.scrollEls.menu
        : this.menuItemEl
      el.scrollIntoView({ behaver: 'smooth' })

    }
  },
})