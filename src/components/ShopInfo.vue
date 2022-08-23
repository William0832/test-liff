<template lang="pug">
.shop-info.p-3
  .title.mb-1.h3  {{ name }}
  .info.p-2  {{ info }}
  .address.d-flex.align-items-center.p-2
    icon(:icon="['far', 'fa-map']").me-3
    .value {{ address }}
  .phone.d-flex.align-items-center.p-2
    icon(:icon="['fas', 'fa-phone']").me-3
    .value {{ phone }}
  .active-time.p-2.d-flex.justify-content-between
    .start.d-flex.align-items-center
      icon(:icon="['far', 'fa-clock']").pe-3
      .value 營業時間 
    .end.d-flex.align-items-center.text-secondary(:class="{ 'text-success': isOpen(nowState) }")
      .value.pe-2 {{ nowState }}
      i.icon-angle(
        type="button", 
        data-bs-toggle="collapse", 
        data-bs-target="#collapseActiveTime", 
        aria-expanded="false", 
        aria-controls="collapseActiveTime"
      ) 
        icon(:icon="['fas', 'fa-angle-up']")
  .collapse#collapseActiveTime
    ul.list-group
      li.list-group-item.d-flex.justify-content-between(
        v-for="e in activeTime" 
        :key="e.dayId"
        :class="{ active: e.dayId === nowDayNum }"
      )
        .week  {{ e.dayName }}
        .state.text-secondary(
          :class="{ 'text-success': isOpen(e.activeTime) }"
        ) {{ e.activeTime }}
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String
  },
  info: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  address: {
    type: String
  },
  activeTime: {
    type: Array
  },
  nowState: {
    type: String
  },
})
const nowDayNum = new Date().getDay()
const isOpen = computed((state) => (state) => (state || props.nowState) !== '休息中')

</script>

<style lang="sass">
li.active 
  font-weight: bolder
  .state 
    color: white !important
.icon-angle
  transition: -10s
  // transform: rotate(90)
</style>
