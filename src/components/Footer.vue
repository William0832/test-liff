<template lang="pug">
.action-box.position-sticky.bottom-0.p-3.bg-light(
  v-if="$route.name !== 'MenuItem'"
)
  button.btn.btn-primary.w-100.btn-order(
    v-if="cartItemLen === 0"
    @click="startToOrder"
  ) 開始點餐
  .d-flex.justify-content-between(v-else)
    .price-box
      .label 總金額
      .price.fw-bolder.py-1.text-center $ {{ cartTotalMoney }}
    .btns.d-flex.align-items-center
      button.btn.btn-secondary.me-2(
        v-if="$route.name !== 'Home'"
        @click="$router.push('/')"
      ) 繼續點餐
      button.btn.btn-primary(@click="submit") 
        span(v-if="isConfirmOrder") 結帳
        span(v-else) 確認餐點
        .badge.text-bg-light.ms-1 {{ cartItemLen }}
</template>


<script setup>
// import liff from '@line/liff'

import { storeToRefs } from 'pinia'
import { onMounted, reactive, computed } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { useOrderStore } from '@/stores/order'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const isConfirmOrder = computed(() => route.name === 'ConfirmOrder')

const menuStore = useMenuStore()
const orderStore = useOrderStore()
const { cartItemLen, cartTotalMoney } = storeToRefs(orderStore)

const startToOrder = () => {
  if (isConfirmOrder.value) {
    router.push({ name: 'Home' })
    return
  }
  menuStore.scrollToShow('menu')
}
const submit = async() => {
  if (isConfirmOrder.value) {
    console.log('結帳')
    orderStore.confirmOrder()
    return
  }
  router.push({ name: 'ConfirmOrder' })
}
</script>

<style lang="sass">
.action-box
  z-index: 999
</style>