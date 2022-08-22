<template lang="pug">
ImgWall(:imgs="shop.imgs")
ShopInfo(v-bind="shop", :nowState="nowState")
Menu(
  :showMenuTypes="showMenuTypes"
  :items="items"
)
.action-box.position-sticky.bottom-0.p-3
  button.btn.btn-primary.w-100.btn-order(@click="orderStore.menuScrollToShow()") 開始點餐
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
const orderStore = useOrderStore()
const { shop, nowState } = storeToRefs(shopStore)
const { showMenuTypes, items } = storeToRefs(menuStore)
// const lineUserData = reactive({
//   message: '',
//   error: '',
//   isLogin: false
// })

onMounted(async () => {
  // try {
  //   await liff.init({
  //     liffId: import.meta.env.VITE_LIFF_ID,
  //     withLoginOnExternalBrowser: false
  //   })
  //   lineUserData.isLogin = liff.isLoggedIn()
  //   lineUserData.message = 'LIFF init succeeded.'
  // } catch (err) {
  //   lineUserData.message = 'LIFF init failed.'
  //   lineUserData.error = `${err}`
  // }
  // try {
  //   const res = await gApi.login()
  //   console.log(res)
  // } catch (err) {
  //   console.error(err)
  //   module.error = `${err.details}`
  // }
})
</script>