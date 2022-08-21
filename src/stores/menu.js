import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    type: [{
      id: 1,
      name: '主餐',
      isShowOnTabs: true,
      items: [
        { id: 1, typeId: 1, name: '辣味炒泡麵', price: 120, info: '好吃辣味炒泡麵', isSaleOut: false, img: '' },
        { id: 2, typeId: 1, name: '原味炒泡麵', price: 120, info: '好吃炒泡麵', isSaleOut: false, img: '' },
      ]
    }, {
      id: 2,
      name: '飲料',
      isShowOnTabs: true,
      items: [
        { id: 3, typeId: 2, name: '檸檬可樂', price: 50, info: '檸檬可樂', isSaleOut: false, img: '' },
        { id: 4, typeId: 2, name: '椰子水', price: 50, info: '椰子水', isSaleOut: false, img: '' },
        { id: 5, typeId: 2, name: '果汁', price: 60, info: '果汁', isSaleOut: false, img: '' },
        { id: 6, typeId: 2, name: '啤酒', price: 60, info: '啤酒', isSaleOut: false, img: '' },
      ]
    },
    {
      id: 3,
      name: '主餐加點',
      isShowOnTabs: false,
      items: [
        { id: 7, typeId: 3, name: '韓式泡菜', price: 20, info: '韓式泡菜', isSaleOut: false, img: '' },
        { id: 8, typeId: 3, name: '素香腸', price: 20, info: '素香腸', isSaleOut: false, img: '' },
      ]
    }],
    items: [
      { id: 1, typeId: 1, name: '辣味炒泡麵', price: 120, info: '好吃辣味炒泡麵', isSaleOut: false, img: '' },
      { id: 2, typeId: 1, name: '原味炒泡麵', price: 120, info: '好吃炒泡麵', isSaleOut: false, img: '' },
      { id: 3, typeId: 2, name: '檸檬可樂', price: 50, info: '檸檬可樂', isSaleOut: false, img: '' },
      { id: 4, typeId: 2, name: '椰子水', price: 50, info: '椰子水', isSaleOut: false, img: '' },
      { id: 5, typeId: 2, name: '果汁', price: 60, info: '果汁', isSaleOut: false, img: '' },
      { id: 6, typeId: 2, name: '啤酒', price: 60, info: '啤酒', isSaleOut: false, img: '' },
    ],
    itemAddForMainItem: [
      { id: 7, typeId: 3, name: '韓式泡菜', price: 20, info: '韓式泡菜', isSaleOut: false, img: '' },
      { id: 8, typeId: 3, name: '素香腸', price: 20, info: '素香腸', isSaleOut: false, img: '' },
    ],
    currentTypeId: 1
  }),
  getters: {
    showItems: () => state.items?.filter(e => e.typeId === this.currentTypeId),
    showMenuTypes: (state) => state.type?.filter(e => e.isShowOnTabs)
  },
  actions: {
  },
})