<template lang="pug">
table.table
  thead
    tr
      th(v-for="col in cols") {{col.key}}
  template(v-if="foods?.length")
    tbody
      tr(v-for="item in foods")
        td(v-for="col in cols") {{item?.[col.key]}}
</template>

<script setup>
import { useFoodStore } from '@/stores/foods'
import { storeToRefs } from 'pinia'
import { onBeforeRouteUpdate } from 'vue-router'
const foodStore = useFoodStore()
const { foods } = storeToRefs(foodStore)
const cols = [
  { id: 1, key: 'id' },
  { id: 2, key: 'name' },
  { id: 2, key: 'info' },
  { id: 3, key: 'price' },
  { id: 3, key: 'img' },
  { id: 3, key: 'isSoldOut' }
]
onBeforeRouteUpdate(async (to) => {
  const foodTypeId = +to.params.foodTypeId
  await foodStore.fetchFoods(1, foodTypeId)
})
</script>

<style lang="sass" scoped>
</style>
