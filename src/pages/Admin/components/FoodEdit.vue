<template lang="pug">
form.form.g-3.needs-validation.row
  .col-md-6
    label(for="name").form-label Name
    input#name.form-control(v-model="data.name" require)
    .invalid-feedback required
  .col-md-6
    label(for="price").form-label Price
    input#price.form-control(v-model="data.price" require type='number')
    .invalid-feedback required
  .col-md-6
    .form-check
      input#is-sold-out.form-check-input(v-model="data.isSoldOut" require type="checkbox")
      label(for="is-sold-out").form-check-label Sold Out

  .col-md-6
    label(for="food-type").form-label Food Type
    select#food-type.form-select(:value="foodTypeId" require disabled)
      option(v-for="e in foodTypes" :key="e.id" :value="e.id") {{e.name}}
  .col-12
    label(for="info").form-label Info.
    textarea#info.form-control(v-model="data.info")
  .col-12
    .btns.d-flex.justify-content-end.gap-2
      button.btn.btn-light(@click="$router.go(-1)") cancel
      button.btn.btn-primary(@click.prevent="submit") submit
  template(v-if="msg")
    ToastVue(:msg="msg")
</template>

<script setup>
import ToastVue from '@/components/Toast.vue'
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFoodStore } from '../../../stores/foods'
const msg = ref('')
const foodStore = useFoodStore()
const data = reactive({
  name: '',
  price: 0,
  info: '',
  isSoldOut: false
})
const foodTypes = ref([
  { id: 0, name: '請選擇' },
  { id: 1, name: '主餐' },
  { id: 2, name: '飲料' },
  { id: 3, name: '主餐加點' }
])
const route = useRoute()
const foodTypeId = computed(() => route.params.foodTypeId)
const type = computed(() => route.params.type)
const foodId = computed(() => route.query.foodId)
const submit = async (e) => {
  try {
    if (type.value === 'create') {
      const payload = {
        foodTypeId: +foodTypeId.value,
        ...data
        // imgId
      }
      const res = await foodStore.createFood(payload)
      console.log(res)
    }
  } catch (err) {
    msg.value = 'submit error'
    setTimeout(() => { msg.value = '' }, 1000)
  }
}
onMounted(async () => {
  data.foodTypeId = foodTypeId.value
})
</script>

<style lang="sass" scoped>
</style>
