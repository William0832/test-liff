<template lang="pug">
ul.list-group
  li.list-group-item(v-for="e in computedFoods")
    .order-food
      .name.text-truncate {{e?.name}}
        span.elseText {{e?.elseText}}
      .amount x {{e?.amount}}
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  foods: {
    type: Array,
    default: () => []
  }
})
const handelFoodText = (text) => {
  if (text === '' || text === 'null' || text == null) return ''
  return `-${text}`
}
const computedFoods = computed(() => props.foods.map(f => {
  const { addItems, special, spicyLevel, food, amount } = f
  const { name } = food
  const elseText = `
   ${handelFoodText(spicyLevel)}
   ${handelFoodText(addItems)}
   ${handelFoodText(special)}
  `
  return { name, elseText, amount }
}))
</script>

<style lang="sass" scoped>
.order-food
  display: flex
  font-size: 10px
  min-width: 100px
  justify-content: space-between
  align-items: center
  .amount
    padding-left: .5rem
    font-size: 1rem
    white-space: nowrap
  .name
    font-size: 1rem
    font-weight: 500
    // white-space: normal
  .elseText
    font-size: .8rem
    font-weight: 400

</style>
