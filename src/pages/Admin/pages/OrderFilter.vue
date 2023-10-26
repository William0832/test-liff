<template lang="pug">
.filter.bg-light.p-3.rounded.pb-2
  .title.d-flex.justify-content-between.pb-1
    strong Filter:
    .btn-rotate(
      :class="{rotate: collapses}"
      @click="toggleCollapse()"
    )
      Icon(:icon="['fas', 'fa-chevron-down']")
  .d-flex.gap-4.align-items-center.flex-wrap.wrapper.coll(:class="{show: !collapses}")
    TheInput(label="客戶" v-model="filter.userName")
    TheInput(label="餐點" v-model="filter.food")
    TheRadios(v-bind="payStatusOptions" v-model="filter.payStatus")
    TheRadios(v-bind="prepareStatusOptions" v-model="filter.prepareStatus").pb-3
</template>

<script setup>
import TheInput from '@/components/TheInput.vue'
import TheRadios from '@/components/TheRadios.vue'
import { payStatusOptions, prepareStatusOptions } from '@/assets/database/options'
import { useAdminOrderStore } from '@/stores/adminOrder'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const adminOrderStore = useAdminOrderStore()
const InputTimeType = computed(() =>
  route.params.orderType === 'today' ? 'time' : 'datetime-local'
)
const { filter } = storeToRefs(adminOrderStore)
const collapses = ref(false)
const toggleCollapse = () => {
  collapses.value = !collapses.value
  if (!collapses.value) adminOrderStore.resetFilter()
}
</script>

<style lang="sass" scoped>
.wrapper
  // max-width: 1000px
.filter
  --t: .5s
</style>
