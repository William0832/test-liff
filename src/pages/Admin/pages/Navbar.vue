<template lang="pug">
.row(v-if="globalStore.isAuth")
  nav.link-box.nav.col
    router-link(:to="{ name: 'OrderManager' }").nav-link orders
    router-link(:to="{ name: 'FoodTable' }").nav-link foods
    router-link(:to="{ name: 'Login' }").nav-link.link-logout Logout
  .col-1.d-flex.justify-content-end
    AdminAlertBtn
</template>

<script setup>
// import { ref } from 'vue'
import AdminAlertBtn from '@/components/AdminAlertBtn.vue'
import { useGlobalStore } from '@/stores/global'
const globalStore = useGlobalStore()
// const toastInfoEl = ref(null)
// const onShowInfo = () => {
//   if (!toastInfoEl.value) return
//   // eslint-disable-next-line
//   const toast = new bootstrap.Toast(toastInfoEl.value)
//   toast.show()
// }
</script>

<style lang="sass" scoped>
.row
  border-block-end: 1px solid var(--bs-secondary)
.link-logout
  color: var(--bs-danger) !important
// .nav-link
//   color: var(--bs-secondary)
//   transition: all 0.2s

// .router-link-active
//   color: var(--bs-dark)
//   font-weight: bold
//   transition: all 0.3s
</style>
