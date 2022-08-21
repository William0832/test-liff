<template lang="pug">
.menu
  .title.p-2 菜單
  .tabs.d-flex
    .tab.p-2(
      v-for='type in showMenuTypes'
      :key="type.id"
    ) {{ type.name }}
  ItemsView(:showMenuTypes="showMenuTypes")
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<script setup>
import ItemsView from './ItemsView.vue'
const props = defineProps({
  showMenuTypes: {
    type: Array,
    default: () => [
    ]
  },
  items: {
    type: Array,
    default: () => []
  }
})
</script>
<style lang="sass">
.menu
  flex: 1
  background-color: rgba(red,0.3)
</style>