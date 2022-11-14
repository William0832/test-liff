<template lang="pug">
.container-fluid
  MyTable(:cols="cols", :rows="adminOrders" :pagination="pagination")
    template(#status="{row}")
      td
        .d-flex.flex-column.gap-1
          .btn.badge.bg-secondary(
            @click="updateOrderStatus(row.id, 'pay')"
            :class="setBgClass(row.payStatus)"
          ) 💰{{row.payStatus}}
          .btn.badge.bg-secondary(
            @click="updateOrderStatus(row.id, 'prepare')"
            :class="setBgClass(row.prepareStatus)"
          ) 🍳{{row.prepareStatus}}
          button.btn.btn-outline-danger() cancel
    template(#owner="{item}")
      td
        div {{item.name}}
    template(#orderFoods="{item}")
      td
        OrderFoodsCard(:foods="item")
    template(#updatedAt="{item}")
      td
        .time {{dayjs(item).format('HH:mm:ss MM/DD')}}
</template>

<script setup>
import dayjs from 'dayjs'
import OrderFoodsCard from './OrderFoodsCard.vue'
import MyTable from '@/components/MyTable.vue'

import { usePageStore } from '@/stores/page'
import { useAdminOrderStore } from '@/stores/adminOrder'
import { storeToRefs } from 'pinia'
import { watchEffect, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
const setBgClass = (value) => {
  if (value === 'canceled') return 'bg-danger'
  if (value === 'pending') return 'bg-secondary'
  if (value === 'completed') return 'bg-success'
  return 'bg-warning'
}
const route = useRoute()
const adminOrderStore = useAdminOrderStore()
const { adminOrders } = storeToRefs(adminOrderStore)
const { updateOrderStatus } = adminOrderStore
const cols = [
  {
    label: 'Id',
    key: 'id'
  }, {
    label: '備註',
    key: 'special'
  }, {
    label: '狀態',
    key: 'status' // prepareStatus + payStatus
  },
  {
    label: '$',
    key: 'totalPrice'
  },
  {
    label: '客戶',
    key: 'owner'
  }, {
    label: '餐點s',
    key: 'orderFoods'
  },
  {
    label: 'Update',
    key: 'updatedAt'
  }
]

const pageStore = usePageStore()
pageStore.setOrder({ by: 'updatedAt', type: 'desc' })
const { pagination } = storeToRefs(pageStore)
watchEffect(async () => {
  await adminOrderStore.fetchAdminOrders(route.params.orderType)
})
</script>

<style lang="sass" scoped>
</style>
