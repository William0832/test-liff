<template lang="pug">
.tab-view(ref="tabView")
  .tab-box(
    v-for="(menuType, i) in showMenuTypes"
    :key="menuType.id"
    :id="menuType.name === '主餐'? 'food': 'drink'"
    :ref="el => { itemEls[i] = el }"
  )
    h5.mt-1.p-2.px-3.border-bottom {{ menuType.name }}
    ItemCard(
      v-for="item in menuType.items"
      :key="item.id"
      v-bind="item"
      @click="onSelectFood(item)"
    )
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useObserver } from '@/composable/useObserver'
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menu'
import ItemCard from './ItemCard.vue'
const props = defineProps({
  showMenuTypes: {
    type: Array,
    default: () => []
  }
})
const router = useRouter()

const onSelectFood = item => {
  if (item.isSoldOut) return
  router.push({ name: 'MenuItem', params: { foodId: item.id } })
}

const menuStore = useMenuStore()
const tabView = ref()
const itemEls = ref([])

const observer = useObserver({
  root: tabView.value,
  els: itemEls.value,
  activeCB: (entry) => {
    const { id } = entry.target
    menuStore.menuCurrentActiveId = id
  }
})
</script>
