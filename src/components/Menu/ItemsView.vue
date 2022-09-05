<template lang="pug">
.tab-view(ref="tabView")
  .tab-box(
    v-for="(menuType, i) in showMenuTypes"
    :key="menuType.id"
    :ref="el => { itemEls[i] = el }"
  )
    h5.mt-1.p-2.pb-1.border-bottom {{ menuType.name }}
    ItemCard(
      v-for="item in menuType.items"
      :key="item.id"
      v-bind="item"
      @click="onSelectFood(item)"
    )
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, onBeforeUpdate, onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu'
import ItemCard from './ItemCard.vue'
const router = useRouter()
const menuStore = useMenuStore()
const props = defineProps({
  showMenuTypes: {
    type: Array,
    default: () => []
  }
})
const maxHeight = computed(() => {
  let removeHeight = 0
  if (document.body.clientHeight >= 667) removeHeight = 148
  if (document.body.clientHeight >= 740) removeHeight = 148
  if (document.body.clientHeight >= 844) removeHeight = 155
  if (document.body.clientHeight >= 915) removeHeight = 155
  if (document.body.clientHeight >= 1024) removeHeight = 155
  if (document.body.clientHeight >= 1180) removeHeight = 160
  return `${document.body.clientHeight - removeHeight}px`
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
const onSelectFood = item => {
  if (item.isSoldOut) return
  router.push({ name: 'MenuItem', params: { foodId: item.id } })
}
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
.tab-view
  max-height: v-bind(maxHeight)
  overflow: auto
</style>
