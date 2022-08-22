<template lang="pug">
.tab-view(ref="tabView")
  template(v-for="(menuType, i) in showMenuTypes" :key="menuType.id")
    .tab-name.p-2(
      :ref="el => { nameEls[i] = el }"
      :data-anchor-id="menuType.id"
    ) {{ menuType.name }}
    ItemCard(v-for="item in menuType.items" :key="item.id" v-bind="item")
</template>

<script setup>
import { ref, onBeforeUpdate, computed } from 'vue'
import { useOrderStore } from '@/stores/order';
import ItemCard from './ItemCard.vue'
const orderStore = useOrderStore()
const props = defineProps({
  isShowTab: {
    type: Boolean,
    default: false
  },
  activeTabId: {
    type: Number,
    default: () => 0
  },
  showMenuTypes: {
    type: Array,
    default: () => []
  }
})
const nameEls = ref([])
const tabView = ref(null)
const menuScrollToView = computed(() => {
  if (!props.isShowTab) return
  const el = nameEls.value.find(e =>
    +e.dataset.anchorId === props.activeTabId
  )
  el.scrollIntoView()
})
orderStore.registerMenuEl(tabView)

onBeforeUpdate(() => {
  nameEls.value = []
})
</script>
<style lang="sass">
.tab
  &-name
    color: rgba(blue, 0.9)
  &-view
    max-height: 350px
    overflow: auto
</style>