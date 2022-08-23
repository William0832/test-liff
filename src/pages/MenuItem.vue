<template lang="pug">
.p-2.pt-3.h-100
  TopToHome
  .item-Info.p-2.row.m-0
    .col-7
      h4.title.fw-semibold {{ item.name }}
      .price-box.d-flex
        h5.price.fw-semibold(:class="removePriceClass") ${{ item.price }}
        h4.price.ms-1.fw-semibold(:class="discountPriceClass") ${{ finalPrice }}
      .info {{ item.info }}
    .col.d-flex.align-items-center
      img.w-100.rounded(src="https://fakeimg.pl/200/")
  .my-1(v-if="spicyLevels")
    label.form-label.mb-0 辣度
    .form-control
      .form-check(v-for="item in spicyLevels" :key="item.id")
        input.form-check-input(
          v-model="order.option.spicyLevel"
          type="radio" 
          :value="item.name" 
          :id="`spicy-${item.id}`" 
        )
        label.form-check-label(:for="`spicy-${item.id}`") {{ item.name }}
  .my-1(v-if="addItemList")
    label.form-label.mb-0 加料
    .form-control
      .form-check(v-for="(e, i) in addItemList" :key="e.id" )
        input.form-check-input(
          type="checkbox" 
          :id="`add-${i + 1}`" 
          :value="e" 
          v-model="order.option.addItems"
        )
        label.form-check-label(:for="`add-${i + 1}`").d-flex {{ e.name }}
          .price.ms-2 ${{ e.price }}
  .my-1
    label.form-label.mb-0 特殊需求
    textarea.form-control(v-model="order.special")
.actions.position-sticky.bottom-0.p-2.bg-light
  .mb-2.row.text-center.align-items-center.mx-0
    .col(@click="addAmount(-1)")
      .btn.badge.badge-pill.text-bg-primary.p-2
        icon(:icon="['fas', 'fa-minus']")
    .col
      input.form-control.amount-input(type="number" min=1, v-model="order.amount")
    .col(@click="addAmount(1)")
      .btn.badge.badge-pill.text-bg-primary.p-2
        icon(:icon="['fas', 'fa-plus']")
  button.btn.btn-primary.w-100.d-flex.justify-content-center.align-items-center(@click="onSubmit") 加入購物車
    h3.pb-0.mb-0
      span.badge.badge-lg.ms-2.text-bg-light ${{ totalPrice || 0 }}
</template>

<script setup>
import { computed, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'
import TopToHome from '@/components/TopToHome.vue'

const orderStore = useOrderStore()
const menuStore = useMenuStore()
const router = useRouter()
const route = useRoute()
const typeId = computed(() => +route.params?.typeId)
const itemId = computed(() => +route.params?.itemId)
const item = menuStore.showItem(+typeId.value, +itemId.value)
const spicyLevels = computed(() => item?.option?.spicyLevels)
const addItemList = computed(() => item?.option?.addItems)
const { id, name, type, price } = item

const finalPrice = menuStore.getPrice({ type, price })
const hasDiscount = computed(() => finalPrice !== item.price)
const removePriceClass = computed(() => ({
  'text-decoration-line-through': hasDiscount.value,
  'text-secondary': hasDiscount.value
}))
const discountPriceClass = computed(() => ({
  'd-none': !hasDiscount.value,
  'text-success': hasDiscount.value
}))

const order = reactive({
  id,
  name,
  type,
  price: finalPrice,
  amount: 1,
  special: '',
  option: item.option ? {
    spicyLevel: spicyLevels.value.find(e => e.isDefault).name,
    addItems: []
  } : null
})
const addAmount = (amount) => {
  const res = order.amount + amount
  order.amount = res < 1 ? 1 : res
}
const totalPrice = computed(() => {
  const addItemTotalPrice = order?.option?.addItems.reduce((sum, curr) => sum + +curr.price, 0) || 0
  const price = finalPrice + addItemTotalPrice
  return order.amount * price
})
const onSubmit = () => {
  const beUpdatedOrder = { ...order, totalPrice: totalPrice.value, price: item.price }
  orderStore.addToCart(beUpdatedOrder)
  router.push({ name: 'ConfirmOrder' })
}
</script>

<style lang="sass">
.amount-input
  text-align: center
</style>
