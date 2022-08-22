<template lang="pug">
.menu
  .title.p-2 菜單
  .tabs.d-flex.nav.nav-pills.p-2.pt-0
    .tab.p-1.nav-link.me-2(
      :class="{ active: activeTabId === item.id }"
      v-for='item in showMenuTypes'
      :key="item.id"
      @click="onActiveTab(item)"
    ) {{ item.name }}
  ItemsView(
    :isShowTab="isShowTab"
    :showMenuTypes="showMenuTypes" 
    :activeTabId="activeTabId"
  )
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<script setup>
import { ref } from 'vue'
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
const activeTabId = ref(1)
const isShowTab = ref(false)
const onActiveTab = (item) => {
  activeTabId.value = item.id
  isShowTab.value = true
}
</script>
<style lang="sass">
.menu
  flex: 1
  border-block-start: 1px solid
.tabs
  border-block-end: 1px solid

</style>