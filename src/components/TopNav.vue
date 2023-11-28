<template lang="pug">
.navbar.border-bottom.sticky-top.nav.nav-pills.justify-content-start.bg-white.nav.nav-pills.px-2
  .nav-item.me-2
    .nav-link(
      @click="clickTab('shop', $event)"
      :class="{active: menuStore.menuCurrentActiveId === 'shop'} "
    ) 首頁
  .nav-item.me-2
    .nav-link(
      @click="clickTab('food',$event)"
      :class="{active: menuStore.menuCurrentActiveId === 'food'} "
    ) 主餐
  .nav-item.me-2
    .nav-link(
      @click="clickTab('drink',$event)"
      :class="{active: menuStore.menuCurrentActiveId === 'drink'} "
    ) 飲料
</template>

<script setup>
import { useMenuStore } from '@/stores/menu'
const menuStore = useMenuStore()
const { clickTab } = menuStore
</script>

<style lang="sass" scoped>

.nav-link
  cursor: pointer
</style>
