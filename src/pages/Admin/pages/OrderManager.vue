<template lang="pug">
.container-fluid
  h4.mt-2.mb-0 訂單管理
  nav.nav
    router-link.nav-link(
      v-for="item in orderTypes" :key="item.id"
      :to="{name: 'OrderTypes', params: {orderType: item.name}}"
    ) {{ item.name }}
  router-view
</template>

<script setup>
import { useAdminOrderStore } from '@/stores/adminOrder'
import { storeToRefs } from 'pinia'
const adminOrderStore = useAdminOrderStore()
const { orderTypes } = storeToRefs(adminOrderStore)
</script>

<style lang="sass" scoped>
</style>
