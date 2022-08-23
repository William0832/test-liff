<template lang="pug">
.menu.border-top.border-secondary
  h3.title.p-2.pb-0 菜單
  .tabs.d-flex.nav.nav-pills.p-2.pt-0.border-bottom.border-secondary
    .tab.p-1.nav-link.me-2(
      v-for='(item, index) in showMenuTypes'
      :class="{ active: currentTabIndex === index }"
      :key="item.id"
      @click="onActiveTab(index)"
    ) {{ item.name }}
  ItemsView(:showMenuTypes="showMenuTypes")
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<script setup>
import ItemsView from './ItemsView.vue'
import { useMenuStore } from '../../stores/menu'
import { storeToRefs } from 'pinia';
const props = defineProps({
  showMenuTypes: {
    type: Array,
    default: () => [
    ]
  }
})
const menuStore = useMenuStore()
const { currentTabIndex } = storeToRefs(menuStore)
const onActiveTab = (index) => {
  currentTabIndex.value = index
  menuStore.scrollToShow()
}
</script>
<style lang="sass">
.menu
  flex: 1
</style>