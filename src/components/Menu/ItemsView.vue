<template lang="pug">
.tab-view(ref="tabView")
  .tab-box(
    v-for="(menuType, i) in showMenuTypes" 
    :key="menuType.id"
    :ref="el => { itemEls[i] = el }"
  )
    h5.tab-name.p-2.pb-0.mb-0 {{ menuType.name }}
    ItemCard(v-for="item in menuType.items" :key="item.id" v-bind="item")
</template>

<script setup>
import { ref, computed, onBeforeUpdate, onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu';
import ItemCard from './ItemCard.vue'
const menuStore = useMenuStore()
const props = defineProps({
  showMenuTypes: {
    type: Array,
    default: () => []
  }
})

const tabView = ref(null)
const itemEls = ref([])
menuStore.registerEl('menu', tabView)
menuStore.registerEl('items', itemEls)
const itemElBeforeScrollTopList = computed(() => {
  let sumHeight = 0
  return itemEls.value?.map((e, i, list) => {
    if (i === 0) return 0
    sumHeight += list[i - 1].clientHeight
    return sumHeight
  })
})
const handelScroll = (e) => {
  const { scrollTop } = e.target
  let index
  itemElBeforeScrollTopList.value.forEach((e, i, array) => {
    if (scrollTop === e || i < array.length - 1 || scrollTop > e) index = i
  })
  menuStore.currentTabIndex = index
}
onMounted(() => {
  tabView.value.addEventListener('scroll', handelScroll)
})
onBeforeUpdate(() => {
  itemEls.value = []
})
</script>
<style lang="sass">
.tab
  &-view
    max-height: 350px
    overflow: auto
</style>