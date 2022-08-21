<template lang="pug">
.tab-view
  template(v-for="menuType in showMenuTypes" :key="menuType.id")
    .tab-name {{ menuType.name }}
    Item(v-for="item in menuType.items" :key="item.id" v-bind="item")
//- </template>

<script setup>
import Item from './Item.vue'
const props = defineProps({
  showMenuTypes: {
    type: Array,
    default: () => []
  }
})
</script>
<style lang="sass">
</style>