<template lang="pug">
.container-fluid.position-relative.d-flex.flex-column.p-0.h-100
  MyLoading(v-if="isLoading")
  router-view
  Footer
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global.js'
import MyLoading from './components/MyLoading.vue'
import Footer from './components/Footer.vue'
const globalStore = useGlobalStore()
const { isLoading } = storeToRefs(globalStore)
</script>

<style lang="sass" src="./assets/style/index.sass">
</style>

<style lang="sass">
.admin
  background-color: #fff
</style>
