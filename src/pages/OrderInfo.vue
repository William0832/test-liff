<!-- eslint-disable vue/one-component-per-file -->
<template lang="pug">
.order.container
  .row.g-2.m-2
    ProductsCard(
      :products="productRows"
      :special="order?.special"
      :totalPrice="order?.totalPrice"
      :isEdit="isEdit"
    )
    InfoCard(title="訂單資料")
      strong 訂單末4碼: {{ orderIdFinal4code }}
      .orderId 訂單號碼: {{ order?.id }}
      .time 訂單日期: {{timeFormat(order?.createdAt)}}
      .time 更新日期: {{timeFormat(order?.updatedAt)}}
      .time.text-danger(v-if="order?.deletedAt")
        | 刪除時間: {{ timeFormat(order?.deletedAt) }}
      .payStatus 付款狀態: {{ order?.payStatus }}
      .payMethod 付款方式: {{ order?.payMethod }}
      .prepareStatus 定單狀態: {{ order?.prepareStatus }}
    InfoCard(title="顧客資料")
      .name 顧客姓名: {{ order?.owner.name }}
      .phone 顧客電話: {{ order?.owner.phone }}
      .lineId Line: {{ order?.owner.lineId }}
    .btns.d-flex.gap-2.justify-content-end.mt-3
      button.btn.btn-primary(
        v-if="isEdit"
        @click=""
      ) 編輯
      button.btn.btn-secondary(
        @click="gobBack"
      ) 返回
</template>
<script>
import dayjs from 'dayjs'
import InfoCard from '@/components/InfoCard.vue'
import ProductsCard from '@/components/CardItems/ProductsCard.vue'
import { onMounted, ref, computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import { useRoute, useRouter } from 'vue-router'
import { timeFormat } from '@/utils/utils'
</script>

<script setup>

const orderStore = useOrderStore()
const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.fullPath.includes('edit'))
const order = ref()
const isAdmin = computed(() => route.fullPath.includes('admin'))
const productCols = [
  {
    label: '名稱',
    key: 'name'
  },
  {
    label: '數量',
    key: 'amount'
  },
  {
    label: '加料',
    key: 'addItems'
  },
  {
    label: '備註',
    key: 'special'
  },
  {
    label: '加料價格',
    key: 'addItemPrice'
  },
  {
    label: '折價',
    key: 'discount'
  },
  {
    label: '價格',
    key: 'totalPrice'
  }]
const productRows = computed(() => {
  if (!order.value?.orderFoods) return []
  return order.value?.orderFoods.map(orderFood => {
    return {
      ...orderFood,
      name: orderFood.food.name
    }
  })
})
const orderIdFinal4code = computed(() => {
  const id = order.value?.id
  if (id == null || !id) return ''
  return id.substr(id.length - 4)
})
const productEl = ref()
const collapses = ref({
  product: false
})
const handelCollapse = () => {
  collapses.value.product = !collapses.value.product
}
const gobBack = () => {
  if (route.path.includes('admin')) {
    router.go(-1)
    return
  }
  router.push('/')
}
onMounted(async () => {
  const { orderId: id } = route.params
  if (id == null) return
  const data = await orderStore.fetchOrder(id)
  order.value = data
})
</script>

<style lang="sass" scoped>
</style>
