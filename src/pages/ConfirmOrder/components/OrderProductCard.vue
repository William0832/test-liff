<template lang="pug">
li.list-group-item
  .head.d-flex.justify-content-between.mb-1
    .title.fw-semibold {{ name }}
    .d-flex.fw-semibold
      .amount.mx-3(v-if="collapse") {{ amount }} x
      .price.fw-semibold $ {{ totalPrice }}
      .badge.text-dark.ms-2.btn-rotate(
        :class="{rotate: collapse}"
        @click="() => collapse =! collapse"
      )
        Icon(:icon="['fas', 'fa-chevron-down']")
  .coll(:class="{show: !collapse}")
    .body.infos.mb-1
      .pb-1.text-secondary(v-for="text in infoTextList" :key="text") {{ text }}
    .footer.actions.d-flex.justify-content-between.mt-1.row(v-if="!readOnly")
      .col-6.amount-ctrl.row
        .col
          button.btn.badge.badge-pill.text-bg-primary.p-2(
            v-if="amount === 1"
            :disabled="disabled"
            @click="onRemoveItem(cartId)"
          ) -
          button.btn.badge.badge-pill.text-bg-primary.p-2(
            v-else
            @click="addItemAmount(cartId, -1)"
            :disabled="disabled || amount === 1"
          ) -
        .col
          .amount.pt-1 {{ amount }}
        .col
          .btn.badge.badge-pill.text-bg-primary.p-2(
            @click="addItemAmount(cartId, 1)"
            :disabled="disabled"
          ) +
      .col-6.d-flex.justify-content-end.gap-2
        button.btn.btn-sm.btn-outline-primary(
          @click="goEditPage"
        ) 編輯
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { modal } from '../../../utils/swal'
const props = defineProps({
  readOnly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  foodId: { type: Number, default: null },
  cartId: { type: String, default: () => null },
  name: { type: String, default: () => '' },
  amount: { type: Number, default: 0 },
  itemPrice: { type: Number, default: 0 },
  infoTextList: { type: Array, default: () => [] },
  addItemAmount: { type: Function, default: () => { } },
  removeItem: { type: Function, default: () => { } },
  goEditPage: { type: Function, default: () => { } }
})
const collapse = ref(false)
const totalPrice = computed(() => props.amount * props.itemPrice)
const onRemoveItem = async (cartId) => {
  const { isConfirmed } = await modal(`確認要刪除 ${props.name}`)
  if (!isConfirmed) return
  props.removeItem(cartId)
}
</script>

<style lang="sass" scoped>
</style>
