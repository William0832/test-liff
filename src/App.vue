<template lang="pug">
.container-fluid.position-relative.d-flex.flex-column.p-0.h-100
  MyLoading(v-if="isLoading")
  router-view
  Footer
</template>

<script setup>
import { onErrorCaptured, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.js'
import { useGlobalStore } from '@/stores/global.js'
import MyLoading from './components/MyLoading.vue'
import Footer from './components/Footer.vue'
import { useOrderStore } from '@/stores/order'
import { setAppHeight } from '@/composable/setAppHeight'
const globalStore = useGlobalStore()
const userStore = useUserStore()
const { isLoading } = storeToRefs(globalStore)
// const { userData } = storeToRefs(userStore)
const isDebug = false
setAppHeight()
onMounted(async () => {
  isLoading.value = true
  if (!isDebug || !import.meta.env.DEV) {
    await userStore.getLineUserData()
  }
  useOrderStore().readCart()
  isLoading.value = false
})

onErrorCaptured((err) => {
  console.warn(err)
  isLoading.value = false
})

</script>

<style lang="sass" src="./assets/style/index.sass">
</style>

<style lang="sass">
.admin
  background-color: #fff
</style>
