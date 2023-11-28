<template lang="pug">
.p-2.pt-3.h-100
  .item-Info.p-2.row.m-0
    .col-7
      h4.title.fw-semibold {{ item.name }}
      .price-box.d-flex
        h5.price.fw-semibold() ${{ item.price }}
      .infos.text-secondary
        .food-type-info {{item.foodType.info }}
        .food-info {{ item.info }}
    .col.d-flex.align-items-center
      img.w-100.rounded(:src="item?.img?.path || './images/noImg.png'")
  .my-1(v-if="isMain")
    label.form-label.mb-0 辣度
    .form-control
      .form-check(v-for="level in spicyLevels" :key="level.id")
        input.form-check-input(
          v-model="order.option.spicyLevel"
          type="radio"
          :value="level.name"
          :id="`spicy-${level.id}`"
        )
        label.form-check-label(:for="`spicy-${level.id}`") {{ level.name }}
  .my-1(v-if="isMain")
    label.form-label.mb-0 加料
    .form-control
      .form-check(
        style="--f-size: 12px;"
        v-for="(e, i) in addItems"
        :key="e.id"
        :class="{'sold-out': e.isSoldOut}"
      )
        input.form-check-input(
          :disabled="e.isSoldOut"
          type="checkbox"
          :id="`add-${i + 1}`"
          :value="e"
          v-model="order.option.addItems"
        )
        label.form-check-label(:for="`add-${i + 1}`").d-flex {{ e.name }}
          .price.ms-2 ${{ e.price }}
          //- .info.text-secondary.ms-2 {{e.info}}

  .my-1
    label.form-label.mb-0 特殊需求
    textarea.form-control(v-model="order.special")
.actions.position-sticky.bottom-0.p-2.bg-light
  .mb-2.row.text-center.align-items-center.mx-0
    .col
      button.btn.badge.badge-pill.text-bg-primary.p-2(
        @click="addAmount(-1)"
        :disabled="!cartId && order.amount === 1"
      )
        Icon(:icon="['fas', 'fa-minus']")
    .col
      input.form-control.amount-input.text-center(
        type="number" min=1, v-model.number="order.amount"
      )
    .col
      button.btn.badge.badge-pill.text-bg-primary.p-2(
        @click="addAmount(1)"
      )
        Icon(:icon="['fas', 'fa-plus']")
  .d-flex.flex-column.gap-2
    button.btn.btn-primary.d-flex.justify-content-center.align-items-center(
      @click="onSubmit"
    )
      span {{ cartId ? '修改購物車訂單': '加入購物車'}}
      h5.pb-0.mb-0
        span.badge.m-1.ms-2.text-bg-light ${{ totalPrice || 0 }}
    button.btn.btn-secondary(
      @click="$router.go(-1)"
    ) 返回
</template>

<script setup>
import { modal } from '@/utils/swal'
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/stores/menu'
import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()
const menuStore = useMenuStore()
const router = useRouter()
const route = useRoute()

const cartId = computed(() => route.query?.cartId)
const cartItem = computed(() => {
  if (!cartId.value) return null
  orderStore.readCart()
  return orderStore.cart.items.find(e => e.cartId === cartId.value)
})

const { showMenuFood: item, spicyLevels, addItems } = storeToRefs(menuStore)
const { id, name, foodType, price } = item.value
const { name: type } = foodType
const isMain = computed(() => type === '主餐')

const order = reactive({
  id,
  name,
  type,
  price,
  amount: cartItem.value ? cartItem.value.amount : 1,
  special: cartItem.value ? cartItem.value.special : '',
  option: addItems.value
    ? {
      spicyLevel: cartItem.value
        ? cartItem.value.spicyLevel
        : spicyLevels.value.find(e => e.isDefault).name,
      addItems: cartItem.value
        ? addItems.value.filter(
          e => cartItem.value.addItems.map(el => el.id).includes(e.id)
        )
        : []
    }
    : null
})
const addAmount = async (newValue) => {
  if (order.amount === 1 && cartId.value) {
    const { isConfirmed } = await modal('確認刪除?')
    if (!isConfirmed) return
    return
  }
  const res = order.amount + newValue
  order.amount = res < 1 ? 1 : res
}
const totalPrice = computed(() => {
  const addItemTotalPrice = order?.option?.addItems == null
    ? 0
    : order?.option?.addItems.reduce((sum, curr) => sum + +curr.price, 0)
  return order.amount * (price + addItemTotalPrice)
})
const onSubmit = () => {
  const beUpdatedOrder = { ...order, totalPrice: totalPrice.value, price: item.value.price }
  if (cartId.value) {
    orderStore.updateCart(cartId.value, beUpdatedOrder)
    router.push({ name: 'Home' })
    return
  }
  orderStore.addToCart(beUpdatedOrder)
  router.push({ name: 'Home' })
}

</script>

<style lang="sass">
</style>
