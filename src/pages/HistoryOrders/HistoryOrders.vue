<template lang="pug">
.container
  h4.mt-3 訂單記錄
  .d-flex.flex-column.gap-3
    template(v-for="(order, index) in historyOrder.orders")
      InfoCard
        .vstack.gap-2
          .id 訂單編號: {{ order.id }}
          .time 下單時間: {{ dayjs(order.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
          .d-flex.justify-content-between
            .order-state(:class="getStateColor(order)") 訂單狀態: {{ getOrderState(order) }}
            button.btn.btn-sm.btn-danger(
              v-if="!order.deletedAt"
              @click="onDeleteOrder(order.id, index)"
            ) 刪除
          ProductsCard(
            :products="order.orderFoods.map(e => ({...e, name: e.food.name}))"
            :special="order?.special"
            :totalPrice="order?.totalPrice"
            :isEdit="false"
            :isShort="true"
          )
    .d-flex.justify-content-evenly.mb-3
      button.btn.btn-secondary(@click="$router.go(-1)") 返回
      button.btn.btn-primary(@click="showMore") 顯示更多

</template>

<script setup>
import { modal } from '@/utils/swal'
import dayjs from 'dayjs'
import InfoCard from '@/components/InfoCard.vue'
import ProductsCard from '@/components/CardItems/ProductsCard.vue'

import { storeToRefs } from 'pinia'
import { onMounted, computed } from 'vue'
import { useOrderStore } from '../../stores/order'
const orderStore = useOrderStore()
const { historyOrder } = storeToRefs(orderStore)
const cursorId = computed(() => historyOrder.value.cursorId)
const showMore = () => {
  orderStore.fetchHistoryOrders({ userId: 1 })
}
const getStateColor = (order) => {
  const { deletedAt, payStatus, prepareStatus } = order
  const result = ''
  if (deletedAt) return 'text-danger'
  return 'text-warning'
}
const getOrderState = ({ payStatus, prepareStatus, deletedAt }) => {
  let payText = '未付款'
  let prepareText = '未收單'
  if (deletedAt) return '訂單已刪除'
  if (payStatus === 'completed') payText = '已付款'

  if (prepareStatus === 'confirmed') prepareText = '準備中'
  else if (prepareStatus === 'completed') prepareText = '完成訂單'
  return `${payText}/${prepareText}`
}
const onDeleteOrder = async (id, index) => {
  const { isConfirmed } = await modal('確認刪除訂單')
  if (!isConfirmed) return
  orderStore.deleteOrder(id, index)
}
onMounted(async () => {
  orderStore.fetchHistoryOrders({ userId: 1 })
})
</script>

<style lang="sass" scoped>
</style>
