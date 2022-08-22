<template lang="pug">
.container.p-0.position-relative.h-100.d-flex.flex-column
  router-view
  .action-box.position-sticky.bottom-0.p-3.bg-light
    button.btn.btn-primary.w-100(v-if="$route.name === 'MenuItem'") 加入購物車
    button.btn.btn-primary.w-100.btn-order(
      v-else-if="cartItemLen === 0"
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
import liff from '@line/liff'

import { storeToRefs } from 'pinia'
import { onMounted, reactive } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { useOrderStore } from '@/stores/order'

const menuStore = useMenuStore()
const orderStore = useOrderStore()
const { cartItemLen, cartTotalMoney } = storeToRefs(orderStore)

const lineUserData = reactive({
  message: '',
  error: '',
  isLogin: false
})

onMounted(async () => {
  try {
    await liff.init({
      liffId: import.meta.env.VITE_LIFF_ID,
      withLoginOnExternalBrowser: false
    })
    lineUserData.isLogin = liff.isLoggedIn()
    lineUserData.message = 'LIFF init succeeded.'
  } catch (err) {
    lineUserData.message = 'LIFF init failed.'
    lineUserData.error = `${err}`
  }
  // try {
  //   const res = await gApi.login()
  //   console.log(res)
  // } catch (err) {
  //   console.error(err)
  //   module.error = `${err.details}`
  // }
})
</script>

<style lang="sass">
html, body
  width: 100%
  height: 100%
  padding: 0
  margin: 0
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  height: 100vh


</style>
