<template lang="pug">
form.form.g-3.needs-validation.row
  .col-12
    ImgUploader(
      v-model:path="food.img.path"
      v-model:file="food.img.file"
    )
  .col-md-6
    label(for="name").form-label Name
    input#name.form-control(v-model="food.name" require)
    .invalid-feedback required
  .col-md-6
    label(for="price").form-label Price
    input#price.form-control(v-model="food.price" require type='number')
    .invalid-feedback required
  .col-md-6
    .form-check.form-switch.sold-out-col
      input#is-sold-out.form-check-input(v-model="food.isSoldOut" require type="checkbox")
      label(for="is-sold-out").form-check-label Sold Out

  .col-md-6
    label(for="food-type").form-label Food Type
    select#food-type.form-select(:value="foodTypeId" require disabled)
      option(v-for="e in foodTypes" :key="e.id" :value="e.id") {{e.name}}
  .col-12
    label(for="info").form-label Info.
    textarea#info.form-control(v-model="food.info")
  .col-12
    .btns.d-flex.justify-content-end.gap-2.mb-2
      button.btn.btn-secondary(@click="$router.go(-1)") Cancel
      button.btn.btn-primary(
        :class="{disabled:isLoading}"
        @click.prevent="onSubmit") Submit
  //- template(v-if="msg")
  //-   ToastVue(:msg="msg")
</template>

<script setup>
import ImgUploader from '@/components/ImgUploader.vue'
import { useGlobalStore } from '@/stores/global'
// import ToastVue from '@/components/Toast.vue'
import { storeToRefs } from 'pinia'
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFoodStore } from '@/stores/foods'
import { ng } from '@/utils/swal'
const globalStore = useGlobalStore()
const { isLoading } = storeToRefs(globalStore)
const foodStore = useFoodStore()
const { foodForEdited: food } = storeToRefs(foodStore)
const { submitFood } = foodStore
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
const router = useRouter()
const onSubmit = async () => {
  try {
    await submitFood(route.params.type)
    router.push({ name: 'FoodTypeFoods', params: { foodTypeId: foodTypeId.value } })
  } catch (err) {
    ng('Error')
  }
}
</script>

<style lang="sass" scoped>
</style>
