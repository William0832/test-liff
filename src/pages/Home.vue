<template lang="pug">
ImgWall(:imgs="shop.imgs")
ShopInfo(v-bind="shop", :nowState="nowState")
Menu(
  :showMenuTypes="showMenuTypes"
)
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, reactive } from 'vue'
// import liff from '@line/liff'
import { useShopStore } from '@/stores/shop'
import { useMenuStore } from '@/stores/menu'
import { useOrderStore } from '@/stores/order'

import ShopInfo from '@/components/ShopInfo.vue'
import ImgWall from '@/components/ImgWall.vue'
import Menu from '@/components/Menu/index.vue'

const shopStore = useShopStore()
const menuStore = useMenuStore()
const { shop, nowState } = storeToRefs(shopStore)
const { showMenuTypes } = storeToRefs(menuStore)

onMounted(async () => {
  useOrderStore().readCart()
})
</script>
