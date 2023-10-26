<template lang="pug">
.container-fluid
  OrderFilter
  MyTable(
    :cols="cols"
    :rows="adminOrders"
    :pagination="pagination"
    :rowClickCB="(row) => adminOrderStore.selectedToggle(row?.id)"
  )
    template(#th-selected="{col}")
      th
        .form-check
          input(
            type="checkbox"
            :checked="adminOrderStore.isAllSelected"
            @click="adminOrderStore.allSelectedToggle"
          ).form-check-input#all-selected
          label.form-check-label(v-if="adminOrderStore.selectedLen" for="all-selected")
            span ({{ adminOrderStore.selectedLen }})
    template(#selected="{row}")
      td
        .form-check
          input(
            type="checkbox"
            :checked="adminOrderStore.isRowSelected(row?.id)"
            @click.stop="adminOrderStore.selectedToggle(row?.id)"
          ).form-check-input
    template(#tail4Id="{row}")
      td
        strong {{ row.id.substr(row.id.length - 4)}}
    template(#status="{row}")
      td
        .d-flex.flex-column.gap-2.my-2
          button.btn.btn-status(
            :disabled="row.isRemove"
            @click.stop="onPay(row)"
            :class="setBgClass(row.payStatus)"
          )
            h5.p-0.m-0 💰{{row.payStatus}}
          button.btn.btn-status(
            :disabled="row.isRemove"
            @click.stop="updateOrderStatus(row.id, 'prepare', row.prepareStatus)"
            :class="setBgClass(row.prepareStatus)"
          )
            h5.p-0.m-0 🍳{{row.prepareStatus}}
          button.btn.btn-danger(v-if="!!row.isRemove" disabled)
            h5.p-0.m-0 deleted
    template(#totalPrice="{item}")
      td
        strong ${{ moneyFormat(item) }}

    template(#owner="{item}")
      td
        strong {{item.name}}
    template(#orderFoods="{item}")
      td
        OrderFoodsCard(:foods="item")
    template(#time="{row}")
      td
        .time {{dayjs(row.createdAt).format('YY/MM/DD HH:mm:ss')}}
    template(#action="{row}")
      td
        .btns.d-flex.gap-2.flex-wrap
          button.btn(
            class="btn btn-primary"
            @click.stop="$router.push({name: 'AdminOrderInfo', params: {orderId: row.id}})"
          ) 明細
          button.btn.btn-danger(
            v-if="!row.deletedAt"
            @click.stop="onDelete(row)") 刪除

</template>

<script setup>
import OrderFilter from './OrderFilter.vue'
import OrderFoodsCard from './OrderFoodsCard.vue'
import MyTable from '@/components/MyTable.vue'
import dayjs from 'dayjs'
import { moneyFormat, useDebounce } from '@/utils/utils'
import { modal } from '@/utils/swal'
import { usePageStore } from '@/stores/page'
import { useAdminOrderStore } from '@/stores/adminOrder'
import { storeToRefs } from 'pinia'
import { watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const setBgClass = (value) => {
  if (value === 'canceled') return 'bg-danger'
  if (value === 'pending') return 'bg-secondary'
  if (value === 'completed') return 'bg-success'
  return 'bg-warning'
}
const route = useRoute()
const adminOrderStore = useAdminOrderStore()
const { adminOrders, filter } = storeToRefs(adminOrderStore)
const { updateOrderStatus } = adminOrderStore
const cols = [
  {
    label: '',
    key: 'selected'
  },
  {
    label: 'Id',
    key: 'tail4Id'
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
    label: 'Time',
    key: 'time'
  },
  {
    label: 'Actions',
    key: 'action'
  }
]
const onDelete = async (order) => {
  const { isConfirmed } = await modal(`確認要刪除訂單(ID: ${order.id}) ?`)
  if (!isConfirmed) return
  await adminOrderStore.deleteOrder(order.id)
}
const pageStore = usePageStore()
pageStore.setOrderBy({ by: 'updatedAt', type: 'desc' })
const { pagination } = storeToRefs(pageStore)

const onPay = async (row) => {
  const { id, payStatus, totalPrice } = row
  if (payStatus === 'pending') {
    const { value } = await modal('進行付款', {
      confirmButtonColor: '',
      confirmButtonText: 'Submit',
      text: `商品: $${moneyFormat(totalPrice)}`,
      input: 'number',
      inputLabel: '付款金額$',
      position: 'top',
      inputValidator: (value) => {
        if (!value) return '請輸入付款金額'
        if (value < totalPrice) return '付款金額不足'
      }
    })
    if (!value) return
    const receivedMoney = +value
    const changes = receivedMoney - +totalPrice
    await updateOrderStatus(row.id, 'pay', row.payStatus)

    await modal('已確認付款', {
      showConfirmButton: false,
      html: `
        <div class="list-group">
          <div class="list-group-item d-flex justify-content-between">實收: 
            <span>$${moneyFormat(receivedMoney)}</span> </div>
          <div class="list-group-item d-flex justify-content-between">商品: 
            <span>$${moneyFormat(totalPrice)}</span></div>
          <div class="list-group-item d-flex justify-content-between">找零:
            <span>$${moneyFormat(changes)}</span>
            </div>
        </div>
      `
    })
    return
  }
  if (payStatus === 'completed') {
    const { isConfirmed } = await modal(`取消訂單(${id.substr(id.length - 4)})已付款狀態?`, {
      html: `
        <div class="list-group">
          <div class="list-group-item d-flex justify-content-between">ID: 
            <span>${id}</span></div>
          <div class="list-group-item  d-flex justify-content-between">商品金額: 
            <span>$${moneyFormat(totalPrice)}</span></div>
        </div>
      `
    })
    if (!isConfirmed) return
    updateOrderStatus(row.id, 'pay', row.payStatus)
  }
}

const debounceFetch = useDebounce(
  async (orderType) => await adminOrderStore.fetchAdminOrders(orderType)
  , 500
)
const clickRow = (row) => {
  console.log(row)
}
watch(() => filter.value, (nv) => {
  debounceFetch(route.params.orderType)
  adminOrderStore.resetSelected()
}, {
  immediate: true,
  deep: true
})
watch(() => pagination.value, (nv) => {
  debounceFetch(route.params.orderType)
}, {
  immediate: true,
  deep: true
})
watch(() => route.params.orderType, async (nv, ov) => {
  if (ov !== nv) {
    adminOrderStore.resetFilter()
    adminOrderStore.resetSelected()
  }
})

</script>

<style lang="sass" scoped>
.btn-status
  color: white
  padding-inline: .8rem
  padding-block: .6rem
  font-size: 1rem
  width: 150px
</style>
