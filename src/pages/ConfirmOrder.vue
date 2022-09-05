<template lang="pug">
.p-2.pt-3.h-100.wrapper.d-flex.flex-column
  TopToHome
  h3.border-bottom.border-secondary.pb-2 確認餐點

  .time.p-2.d-flex.align-items-start
    Icon(:icon="['far', 'fa-clock']").pe-3.pt-1
    .d-block
      .form-check
        input.form-check-input#radio-now(type="radio" v-model="isRightNowOrder" :value="true")
        label.form-check-label(for="radio-now") 現點現做
          span.ms-1.text-secondary (預計20~30分鐘)
      .form-check
        input.form-check-input#radio-pre(type="radio" v-model="isRightNowOrder" :value="false")
        label.form-check-label(for="radio-pre") 預定日期
  .date-select(v-if="!isRightNowOrder").px-2
    .input-box.d-flex.mb-2
      label.form-label.me-3
        Icon(:icon="['fas', 'fa-calendar-day']")
      input.form-control(type="date" v-model="bookingDate")
    .ms-1.text-danger 說明: 我們一般只在週末中午營業, 預定完成後請在與店家確認, 謝謝您！

  .user-info.row.p-2.m-0
    .col
      label.form-label(for="customer-name") 顧客姓名
      input.form-control#customer-name(type="text" v-model="order.customer.name")
    .col
      label.form-label(for="customer-phone") 電話
      input.form-control#customer-phone(type="tel" v-model="order.customer.phone")

  .special-box.mt-1.px-4.py-2
    label.form-label(for="special") 特殊需求
    textarea.form-control#special(v-model="cart.special")

  .detail-box
    h5.mt-2.border-bottom.border-secondary.p-2 訂單明細
    p(v-if="cart.items.length === 0") 沒有餐點
    ul.list-group(v-else)
      li.list-group-item(v-for="(e, index) in cart.items")
        .head.d-flex.justify-content-between.mb-1
          .title.fw-semibold {{ e.name }}
          .price.fw-semibold $ {{ e.itemPrice * e.amount }}
        .body.infos.mb-1
          .pb-1(v-for="text in getItemInfoTexts(e)" :key="text") {{ text }}
        .footer.actions.d-flex.justify-content-between.mt-1
          .amount-ctrl.row
            .col
              button.btn.badge.badge-pill.text-bg-primary.p-2(
                @click="orderStore.addItemAmount(e.cartId, -1)"
                :disabled="e.amount === 1"
              ) -
            .col
              .amount {{ e.amount }}
            .col
              .btn.badge.badge-pill.text-bg-primary.p-2(
                @click="orderStore.addItemAmount(e.cartId, 1)"
              ) +
          button.btn.btn-sm.btn-outline-danger(@click="orderStore.removeItem(e.cartId)") 刪除

</template>

<script setup>
import dayjs from 'dayjs'
import TopToHome from '@/components/TopToHome.vue'
import { computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import { storeToRefs } from 'pinia'

const orderStore = useOrderStore()
const { cart, getItemInfoTexts, order } = storeToRefs(orderStore)
const checkWeekend = (time) => [0, 6].includes(dayjs(time).day())
const checkIsAfterNow = (time) => dayjs(time) > dayjs()
const getFirstWeekend = (time) => {
  if (checkWeekend(time)) {
    return time
  } else {
    const newDate = dayjs(time).add(1, 'day')
    return getFirstWeekend(newDate)
  }
}
const bookingDate = computed({
  get () {
    return cart.value.bookingDate
  },
  set (nv) {
    if (!checkIsAfterNow(nv)) {
      alert('預定日期必須是未來的某一天, 謝謝！')
      cart.value.bookingDate = null
      return
    }
    if (!checkWeekend(nv)) {
      alert('注意：預定日期非週末, 需再與店家確認～～')
    }
    cart.value.bookingDate = nv
  }
})
const isRightNowOrder = computed({
  get: () => {
    return cart.value.bookingDate == null
  },
  set (nv) {
    if (!nv) {
      cart.value.bookingDate = getFirstWeekend(new Date()).format('YYYY-MM-DD')
      return
    }
    cart.value.bookingDate = null
  }
})
</script>

<style lang="sass">
.wrapper
  height: calc(100% - 80px) !important
.detail-box
  display: flex
  flex-direction: column
  flex: 1
  overflow: hidden
  ul
    flex: 1
    overflow: auto

</style>
