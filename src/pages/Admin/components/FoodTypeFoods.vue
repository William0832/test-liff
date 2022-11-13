<template lang="pug">
.container-fluid
  .btns.d-flex.justify-content-end(v-if="$route.name !== 'FoodEdit'")
    button.btn.btn-primary(@click="goEdit('create')") Add
  router-view
  template(v-if="$route.name !== 'FoodEdit'")
    MyTableVue(:cols="cols" :rows="foods" :pagination="pagination")
      template(#isSoldOut="{item, row}")
        td
          MySwitchVue(:modalValue="item" @update:modalValue="update")
          | {{item}}
      template(#action="{row}")
        td
          .d-flex.gap-1
            button.btn.btn-sm.btn-outline-primary(@click="toUpdateFood(row)") Edit
            button.btn.btn-sm.btn-outline-danger Delete
</template>

<script setup>

import MySwitchVue from '@/components/MySwitch.vue'
import MyTableVue from '@/components/MyTable.vue'
import { useFoodStore } from '@/stores/foods'
import { storeToRefs } from 'pinia'
import { watchPostEffect } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const toUpdateFood = (row) => {
  const { id } = row
  router.push({ name: 'FoodEdit', params: { type: 'update' }, query: { id } })
}
const update = (e) => { console.log(e) }
const foodStore = useFoodStore()
const { foods, pagination } = storeToRefs(foodStore)
const cols = [
  { id: 1, key: 'id', label: 'id' },
  { id: 2, key: 'name', label: '名稱' },
  { id: 3, key: 'info', label: 'info' },
  { id: 4, key: 'price', label: '$' },
  { id: 5, key: 'isSoldOut', label: 'soldOut' },
  { id: 6, key: 'action', label: '' }
]
const goEdit = (type, foodId) => {
  router.push({
    name: 'FoodEdit',
    params: {
      type
    },
    query: {
      foodId
    }
  })
}
onBeforeRouteUpdate(async (to) => {
  pagination.value.page = 1
})
watchPostEffect(async () => {
  await foodStore.fetchFoods(1, route.params.foodTypeId)
})
</script>

<style lang="sass" scoped>
</style>
