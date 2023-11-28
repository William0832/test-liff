<template lang="pug">
.action-box.sticky-bottom.p-3.bg-light(
  v-if="showFooter"
)
  .btns.d-flex.flex-column(v-if="cartItemLen === 0")
    button.btn.btn-primary.m-1.w-100.btn-order(
      v-if="cartItemLen === 0"
      @click="startToOrder"
    ) 開始點餐
    button.btn.btn-primary.m-1.w-100(
      @click="$router.push('/historyOrder')"
    ) 歷史訂單

  .row.d-flex.justify-content-between(v-else)
    .price-box.col-12.col-sm-3.d-flex.align-items-center.justify-content-between
      .label 總金額
      .price.fw-bolder.py-1 $ {{ cartTotalMoney }}
    .btns.d-flex.align-items-center.justify-content-end.col-12.col-sm-auto
      button.btn.btn-secondary.me-2(
        v-if="$route.name !== 'Home'"
        @click="$router.push('/')"
      ) 繼續點餐
      button.btn.btn-primary(@click="submit")
        span(v-if="isConfirmOrder") 送出訂單
        span(v-else) 確認餐點
        .badge.text-bg-light.ms-1 {{ cartItemLen }}
      button.btn.btn-primary.ms-1(@click="$router.push('/historyOrder')") 歷史訂單
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/stores/menu'
import { useOrderStore } from '@/stores/order'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const isConfirmOrder = computed(() => route.name === 'ConfirmOrder')

const menuStore = useMenuStore()
const orderStore = useOrderStore()
const { cartItemLen, cartTotalMoney } = storeToRefs(orderStore)
const { clickTab } = menuStore
const showFooter = computed(() =>
  ['Home', 'ConfirmOrder'].includes(route.name)
)
const startToOrder = () => {
  if (isConfirmOrder.value) {
    router.push({ name: 'Home' })
  }
  clickTab('food')
}
const submit = async () => {
  if (isConfirmOrder.value) {
    const order = await orderStore.confirmOrder()
    const { id } = order
    router.push({ name: 'OrderInfo', params: { orderId: id } })
    return
  }
  router.push({ name: 'ConfirmOrder' })
}
</script>

<style lang="sass">
.action-box
  z-index: 999
</style>
