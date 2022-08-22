<template lang="pug">
ImgWall(:imgs="shop.imgs")
ShopInfo(v-bind="shop", :nowState="nowState")
Menu(
  :showMenuTypes="showMenuTypes"
)
.action-box.position-sticky.bottom-0.p-3.bg-light
  button.btn.btn-primary.w-100.btn-order(
    v-if="cartItemLen === 0"
    @click="menuStore.scrollToShow('menu')"
  ) 開始點餐
  .d-flex.justify-content-between(v-else)
    .price-box
      .label 商品總金額
      .price.fw-bolder ${{ cartTotalMoney }}
    button.btn.btn-primary(@click="$router.push({ name: 'ConfirmOrder' })") 確認餐點
      .badge.text-bg-light.ms-1 {{ cartItemLen }}
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
const { showMenuTypes } = storeToRefs(menuStore)
const { cartItemLen, cartTotalMoney } = storeToRefs(orderStore)
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