<template lang="pug">
.p-2.pt-3.h-100.wrapper.d-flex.flex-column
  TopToHome

  h3.border-bottom.border-secondary.pb-2 確認餐點

  .time.p-2.d-flex.align-items-start
    icon(:icon="['far', 'fa-clock']").pe-3.pt-1
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
        icon(:icon="['fas', 'fa-calendar-day']")
      input.form-control(type="date" v-model="selectedDate")
    .ms-1.text-danger 說明: 我們一般只在週末中午營業, 預定完成後請在與店家確認, 謝謝您！

  .special-box.mt-1
    label.form-label(for="special") 特殊需求
    textarea.form-control#special(v-model="tempOrder.special")

  .detail-box
    h4.mt-2.border-bottom.border-secondary.p-2 訂單明細
    ul.list-group
      li.list-group-item(v-for="e in Array(5)") 
        .head.d-flex.justify-content-between 
          .title item1
          .price $100
        .body.info test information~~~~
        .footer.actions.d-flex.justify-content-between 
          //- AmountCtrl(v-model="amount")
          .amount-ctrl -1+
          button.btn.btn-sm.btn-outline-danger 刪除


</template>

<script setup>
import dayjs from 'dayjs'
import TopToHome from '@/components/TopToHome.vue'
import { reactive, ref, computed } from 'vue'
const tempOrder = reactive({
  special: '',
  preOrderDate: null

})

const checkWeekend = (time) => [0, 6].includes(dayjs(time).day())
const checkIsAfterNow = (time) => dayjs(time) > dayjs()

const selectedDate = computed({
  get() {
    return isRightNowOrder ? tempOrder.preOrderDate : null
  },
  set(nv) {
    if (!checkIsAfterNow(nv)) {
      alert('預定日期必須是未來的某一天, 謝謝！')
      isRightNowOrder.value = true
      return
    }
    if (!checkWeekend(nv)) {
      alert('注意：預定日期非週末, 需再與店家確認～～')
    }
    tempOrder.preOrderDate = nv
  }
})
const isRightNowOrder = computed({
  get: () => {
    return tempOrder.preOrderDate == null
  },
  set(nv) {
    if (!nv) {
      tempOrder.preOrderDate = dayjs().add(1, 'day').format('YYYY-MM-DD')
      return
    }
    tempOrder.preOrderDate = null
  }
})
</script>

<style lang="sass">
.wrapper
  height: calc(100% - 70px) !important
.detail-box
  display: flex
  flex-direction: column
  flex: 1
  overflow: auto
  ul
    flex: 1
    overflow: auto

</style>