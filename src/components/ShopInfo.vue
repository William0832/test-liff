<script setup>
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
  // isOpen: {
  //   type: Boolean
  // },
  activeTime: {
    type: Array
  },
  nowState: {
    type: String
  },
})
const nowDayNum = new Date().getDay()
</script>
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
    .end.d-flex.align-items-center
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
        :class="{ active: e.dayId === nowDayNum, disabled: nowState !== '休息中' }"
      )
        .week  {{ e.dayName }}
        .state {{ e.activeTime }}


</template>
<style lang="sass">
.icon-angle
  transition: -10s
  // transform: rotate(90)
</style>
