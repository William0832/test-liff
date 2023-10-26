<template lang="pug">
.container-fluid
  .btns.d-flex.justify-content-end(v-if="$route.name !== 'FoodEdit'")
    button.btn.btn-primary(@click="goEditPage('create')") Add
  router-view
  template(v-if="$route.name !== 'FoodEdit'")
    MyTableVue(:cols="cols" :rows="foods" :pagination="pagination")
      template(#isSoldOut="{item, row}")
        td
          MySwitchVue.sold-out-col(
            :modalValue="item"
            @update:modalValue="onUpdateSwitch(row.id, $event)")
      template(#action="{row}")
        td
          .d-flex.gap-1
            button.btn.btn-sm.btn-outline-primary(@click="goEditPage('update', row.id)") Edit
            button.btn.btn-sm.btn-outline-danger(@click="onDelete(row)") Delete
</template>

<script setup>
import { ok, ng, modal } from '@/utils/swal'
import MySwitchVue from '@/components/MySwitch.vue'
import MyTableVue from '@/components/MyTable.vue'

import { useFoodStore } from '@/stores/foods'
import { usePageStore } from '@/stores/page'

import { storeToRefs } from 'pinia'
import { watchPostEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const pageStore = usePageStore()
pageStore.setOrderBy({ by: 'id', type: 'asc' })
const { pagination } = storeToRefs(pageStore)

const foodStore = useFoodStore()
const { foods } = storeToRefs(foodStore)
const cols = [
  { id: 1, key: 'id', label: 'Id' },
  { id: 2, key: 'name', label: '名稱' },
  { id: 3, key: 'info', label: 'Info' },
  { id: 4, key: 'price', label: '$' },
  { id: 5, key: 'isSoldOut', label: 'sold out' },
  { id: 6, key: 'action', label: '' }
]

const goEditPage = (type, foodId) => {
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
const onDelete = async (row) => {
  const { isConfirmed } = await modal(`確認要刪除餐點 "${row.name}" ?`)
  if (isConfirmed) {
    await foodStore.delete(row.id)
  }
}
const onUpdateSwitch = async (foodId, value) => {
  try {
    const res = await foodStore.updateSoldOut(foodId, value)
  } catch (err) {
    ng(err.message)
    const target = foodStore.foods.find(e => +e.id === +foodId)
    console.log(target.isSoldOut)
  }
}

watchPostEffect(async () => {
  await foodStore.fetchFoods(1, route.params.foodTypeId)
})
</script>

<style lang="sass" scoped>
</style>
