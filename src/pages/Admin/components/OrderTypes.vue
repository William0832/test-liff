<template lang="pug">
.container-fluid
  MyTable(:cols="cols", :rows="adminOrders" :pagination="pagination")
    template(#status="{row}")
      td
        .d-flex.flex-column.gap-1
          button.badge.bg-secondary.p-2(
            :disabled="row.isRemove"
            @click="updateOrderStatus(row.id, 'pay', row.payStatus)"
            :class="setBgClass(row.payStatus)"
          ) 💰{{row.payStatus}}
          button.badge.bg-secondary.p-2(
            :disabled="row.isRemove"
            @click="updateOrderStatus(row.id, 'prepare', row.prepareStatus)"
            :class="setBgClass(row.prepareStatus)"
          ) 🍳{{row.prepareStatus}}
          button.btn.btn-outline-danger(@click="onDelete(row)") Remove
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
import { modal } from '@/utils/swal'
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
    label: 'CreateAt',
    key: 'createdAt'
  }
]
const onDelete = async (order) => {
  const { isConfirmed } = await modal(`確認要刪除訂單(ID: ${order.id}) ?`)
  if (!isConfirmed) return
  await adminOrderStore.deleteOrder(order.id)
}
const pageStore = usePageStore()
pageStore.setOrder({ by: 'updatedAt', type: 'desc' })
const { pagination } = storeToRefs(pageStore)
watchEffect(async () => {
  await adminOrderStore.fetchAdminOrders(route.params.orderType)
})
</script>

<style lang="sass" scoped>
.badge
  width: 120px
  cursor: pointer
  font-size: .9rem
</style>
