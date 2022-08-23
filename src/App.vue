<template lang="pug">
.container-fluid.position-relative.d-flex.flex-column.p-0.h-100
  router-view
  .action-box.position-sticky.bottom-0.p-3.bg-light(
    v-if="$route.name !== 'MenuItem'"
  )
    button.btn.btn-primary.w-100.btn-order(
      v-if="cartItemLen === 0"
      @click="menuStore.scrollToShow('menu')"
    ) 開始點餐
    .d-flex.justify-content-between(v-else)
      .price-box
        .label 總金額
        .price.fw-bolder.py-1.text-center $ {{ cartTotalMoney }}
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
  min-width: 375px
  width: 100%
  height: 100%
  padding: 0
  margin: 0
#app
  box-shadow: 0 0 50px 10px rgba(black,0.1)
  background-color: white
  margin-inline: auto
  max-width: 600px
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  height: 100vh
  overflow: auto
</style>
