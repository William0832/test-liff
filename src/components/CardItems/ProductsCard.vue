<template lang="pug">
.product-info.card
  .card-body
    h5.card-title.d-flex.justify-content-between
      span 商品資料
      .btn-rotate(
        :class="{rotate: collapses}"
        @click="() => collapses=!collapses"
      )
        Icon(:icon="['fas', 'fa-chevron-down']")

    .coll(:class="{show: !collapses}")
      .special(v-if="special") 備註: {{ special }}
      template(v-if="!isShort")
        hr
        MyTable(:cols="cols" :rows="products")
      .list-group(v-else v-for="item in products").mt-1.mb-2
        .list-group-item {{ getShortFoodText(item) }}
    .d-flex.justify-content-end.p-2(v-if="isEdit")
      button.btn.btn-sm.btn-primary.rounded-circle.btn-add +
    .money.d-flex.justify-content-between
      span 總額:
      strong.text-bold $ {{totalPrice}}
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MyTable from '../MyTable.vue'

const props = defineProps({
  isShort: { type: Boolean, default: false },
  products: { type: Array, default: () => [] },
  special: { type: String, default: '' },
  totalPrice: { type: Number, default: 0 },
  isEdit: { type: Boolean, default: () => false }
})
const getShortFoodText = (item) => {
  const { amount, food, addItems, spicyLevel, special, addItemPrice } = item
  let elseText = ''
  if (addItems) elseText += `/ ${addItems} ($ ${addItemPrice})`
  if (spicyLevel) elseText += `/ ${spicyLevel}`
  if (special) elseText += `/ ${special}`
  return `${amount} x ${food.name} ($ ${food.price})${elseText}`
}
const addItems = ref([])
const collapses = ref(false)
const cols = [
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
    label: '🌶️',
    key: 'spicyLevel'
  },
  {
    label: '備註',
    key: 'special'
  },
  {
    label: '加料$',
    key: 'addItemPrice'
  },
  {
    label: '折價',
    key: 'discount'
  },
  {
    label: '$',
    key: 'totalPrice'
  }]
</script>

<style lang="sass" scoped>
.product-info
  --t: .25s
.card-short
  border: 0
</style>
