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
import { ref, onBeforeUnmount, onMounted } from 'vue'
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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const { id } = entry.target
        menuStore.menuCurrentActiveId = id
      } else {
        menuStore.menuCurrentActiveId = ''
      }
    })
  },
  {
    threshold: 1,
    root: tabView.value,
    rootMargin: '0px 0px -30px 0px'
  }
)
onMounted(() => {
  itemEls.value.forEach(e => {
    observer.observe(e)
  })
})
onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
  observer.disconnect()
})

</script>
<style lang="sass">
.tab-view
  overflow: auto
</style>
