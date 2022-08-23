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
        spicyLevels: [
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
        { id: 4, typeId: 2, name: '椰子水', price: 60, info: '椰子水', isSaleOut: false, img: '' },
        { id: 5, typeId: 2, name: '果汁', price: 80, info: '果汁', isSaleOut: false, img: '' },
        { id: 6, typeId: 2, name: '啤酒', price: 60, info: '啤酒', isSaleOut: false, img: '' },
      ]
    }],
    currentTabIndex: 0,
    scrollEls: {
      menu: null,
      items: []
    }
  }),
  getters: {
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