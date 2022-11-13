<template lang="pug">
h4.mt-2.mb-0 管理菜單
.container
  nav.nav()
    router-link.nav-link(
      v-for="item in foodTypes" :key="item.id"
      :to="{ name: 'FoodTypeFoods', params: { foodTypeId: item.id }}"
    ) {{item.name}}
router-view
</template>
<script setup>
import { useFoodStore } from '@/stores/foods'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const foodStore = useFoodStore()
const { foodTypes } = storeToRefs(foodStore)

// onMounted(async () => {
//   await foodStore.fetchFoodTypes(1)
// })
</script>

<style lang="sass" scoped>

</style>
