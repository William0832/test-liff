<template lang="pug">
.p-2.pt-3.h-100
  TopToHome
  .item-Info.p-2.row.m-0
    .col-7
      h4.title.fw-semibold {{ item.name }}
      .price-box.d-flex
        h5.price.fw-semibold() ${{ item.price }}
      .infos.text-secondary 
        .food-type-info {{item.foodType.info }}
        .food-info {{ item.info }}
    .col.d-flex.align-items-center
      img.w-100.rounded(src="https://fakeimg.pl/200/")
  .my-1(v-if="isMain")
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
  .my-1(v-if="isMain")
    label.form-label.mb-0 加料
    .form-control
      .form-check(
        style="--f-size: 5px;"
        v-for="(e, i) in addItems" 
        :key="e.id" 
        :class="{'sold-out': e.isSoldOut}"
        data-bs-container="body" 
        data-bs-toggle="popover" d
        ata-bs-placement="top" 
        :data-bs-content="e.info"
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
      //- span.badge.badge-lg.ms-2.text-bg-light ${{ totalPrice || 0 }}
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'
import TopToHome from '@/components/TopToHome.vue'
import { storeToRefs } from 'pinia'

const orderStore = useOrderStore()
const menuStore = useMenuStore()
const router = useRouter()
const { showMenuFood: item, spicyLevels, addItems } = storeToRefs(menuStore)
const { id, name, foodType, price } = item.value
const { name: type } = foodType
const isMain = computed(() => type === '主餐')

const order = reactive({
  id,
  name,
  type,
  price,
  amount: 1,
  special: '',
  option: addItems.value ? {
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
  return order.amount * (price + addItemTotalPrice)
})
const onSubmit = () => {
  const beUpdatedOrder = { ...order, totalPrice: totalPrice.value, price: item.price }
  console.log(beUpdatedOrder)
  orderStore.addToCart(beUpdatedOrder)
  router.push({ name: 'Home' })
}
</script>

<style lang="sass">
.amount-input
  text-align: center
</style>
