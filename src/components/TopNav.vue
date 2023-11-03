<template lang="pug">
.navbar.border-bottom.sticky-top.nav.nav-pills.justify-content-start.bg-white.nav.nav-pills.mx-2
  .nav-item.me-2
    .nav-link(
      @click="clickTab('home')"
      :class="{active: menuStore.menuCurrentActiveId === 'home'} "
    ) 首頁
  .nav-item.me-2
    .nav-link(
      @click="clickTab('food')"
      :class="{active: menuStore.menuCurrentActiveId === 'food'} "
    ) 主餐
  .nav-item.me-2
    .nav-link(
      @click="clickTab('drink')"
      :class="{active: menuStore.menuCurrentActiveId === 'drink'} "
    ) 飲料
</template>

<script setup>
import { useMenuStore } from '@/stores/menu'
import { nextTick } from 'vue'
const menuStore = useMenuStore()

const clickTab = (id) => {
  const scrollOption = { behavior: 'smooth', block: 'start' }
  nextTick(() => {
    const el = document.getElementById(id)
    menuStore.menuCurrentActiveId = id
    scrollOption.block = id === 'food' ? 'center' : 'start'
    el.scrollIntoView(scrollOption)
  })
}
</script>

<style lang="sass" scoped>

.nav-link
  cursor: pointer
</style>
