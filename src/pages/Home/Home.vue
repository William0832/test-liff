<template lang="pug">
.home(ref="homeEl")
  TopNav
  #shop(:ref="e => { els[0]=e }")
    ImgWall(:imgs="shop.imgs")
    ShopInfo(v-bind="shop", :nowState="nowState")
  Menu(
    :showMenuTypes="showMenuTypes"
  )
</template>

<script setup>
import { useElementSize } from '@vueuse/core'
import TopNav from '@/components/TopNav.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useShopStore } from '@/stores/shop'
import { useMenuStore } from '@/stores/menu'
import { useOrderStore } from '@/stores/order'

import ShopInfo from './components/ShopInfo.vue'
import ImgWall from './components/ImgWall.vue'
import Menu from './components/Menu/index.vue'
import { useObserver } from '../../composable/useObserver'

const shopStore = useShopStore()
const menuStore = useMenuStore()
const { shop, nowState } = storeToRefs(shopStore)
const { showMenuTypes } = storeToRefs(menuStore)

const homeEl = ref()
const els = ref([])
const observer = useObserver({
  root: homeEl.value,
  els: els.value,
  activeCB: (entry) => {
    const { id } = entry.target
    menuStore.menuCurrentActiveId = id
  }
})
</script>
