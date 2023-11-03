<template lang="pug">
.menu.border-top.border-secondary
  h3.title.p-3.pb-0 菜單
  ItemsView(:showMenuTypes="showMenuTypes")
</template>

<script>
import ItemsView from './ItemsView.vue'
import { useMenuStore } from '@/stores/menu'
import { storeToRefs } from 'pinia'
export default {
  name: 'MenuIndex'
}
</script>

<script setup>
const props = defineProps({
  showMenuTypes: {
    type: Array,
    default: () => [
    ]
  }
})
</script>
<style lang="sass" scoped>
.menu
  // flex: 1
.nav-link
  cursor: pointer
</style>
