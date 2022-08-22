import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    type: [{
      id: 1,
      name: '主餐',
      isShowOnTabs: true,
      items: [
        { id: 1, typeId: 1, name: '蔬食炒泡麵', price: 120, info: '蔬食炒泡麵', isSaleOut: false, img: '' },
        { id: 2, typeId: 1, name: '蔬食香腸炒泡麵', price: 150, info: '蔬食香腸炒泡麵', isSaleOut: false, img: '' },
      ],
      option: {
        spicyLevelOptions: [
          {
            id: 1, name: '完全不辣', isDefault: false
          },
          {
            id: 2, name: '微辣(原味)', isDefault: true
          },
          {
            id: 3, name: '加辣', isDefault: false
          },
        ],
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
      isShowOnTabs: true,
      items: [
        { id: 3, typeId: 2, name: '檸檬可樂', price: 50, info: '檸檬可樂', isSaleOut: false, img: '' },
        { id: 4, typeId: 2, name: '椰子水', price: 50, info: '椰子水', isSaleOut: false, img: '' },
        { id: 5, typeId: 2, name: '果汁', price: 80, info: '果汁', isSaleOut: false, img: '' },
        { id: 6, typeId: 2, name: '啤酒', price: 60, info: '啤酒', isSaleOut: false, img: '' },
      ],
      option: {

      }
    },
    {
      id: 3,
      name: '單點/加點',
      isShowOnTabs: false,
      items: [
        { id: 7, typeId: 3, name: '韓式泡菜', price: 20, info: '韓式泡菜', isSaleOut: false, img: '' },
        { id: 8, typeId: 3, name: '素香腸', price: 20, info: '素香腸', isSaleOut: false, img: '' },
      ]
    }],
    // items: [
    //   { id: 1, typeId: 1, name: '辣味炒泡麵', price: 120, info: '好吃辣味炒泡麵', isSaleOut: false, img: '' },
    //   { id: 2, typeId: 1, name: '原味炒泡麵', price: 120, info: '好吃炒泡麵', isSaleOut: false, img: '' },
    //   { id: 3, typeId: 2, name: '檸檬可樂', price: 50, info: '檸檬可樂', isSaleOut: false, img: '' },
    //   { id: 4, typeId: 2, name: '椰子水', price: 50, info: '椰子水', isSaleOut: false, img: '' },
    //   { id: 5, typeId: 2, name: '果汁', price: 60, info: '果汁', isSaleOut: false, img: '' },
    //   { id: 6, typeId: 2, name: '啤酒', price: 60, info: '啤酒', isSaleOut: false, img: '' },
    // ],
    // itemAddForMainItem: [
    //   { id: 7, typeId: 3, name: '韓式泡菜', price: 20, info: '韓式泡菜', isSaleOut: false, img: '' },
    //   { id: 8, typeId: 3, name: '素香腸', price: 20, info: '素香腸', isSaleOut: false, img: '' },
    // ],
    currentTypeId: 1
  }),
  getters: {
    showItems: () => state.items?.filter(e => e.typeId === this.currentTypeId),
    showMenuTypes: (state) => state.type?.filter(e => e.isShowOnTabs)
  },
  actions: {
  },
})