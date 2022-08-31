<template lang="pug">
.row(v-if="globalStore.isAuth")
  nav.link-box.nav.col
    router-link(:to="{name: 'OrderTable'}").nav-link orders
    router-link(:to="{name: 'FoodTable'}").nav-link foods
    router-link(:to="{name: 'Login'}").nav-link.text-danger Logout
  .col-1.d-flex.justify-content-end
    button.btn.btn-secondary.position-relative.mb-1(@click="onShowInfo")
      icon(:icon="['fas', 'fa-bell']")
      span.position-absolute.top-0.start-100.translate-middle.badge.rounded-pill.bg-danger  1      

  
.toast-container.position-fixed.top-0.end-0.p-3
  .toast(role="alert", aria-live="assertive", aria-atomic="true" ref="toastInfoEl")
    .toast-header
      strong.me-auto 訊息
      small 1 mins ago
      button.btn-close(type="button", data-bs-dismiss="toast", aria-label="Close")
    .toast-body 
      ul.list-group
        li.list-group-item.d-flex.justify-content-between  取得新訂單 $100
          small 1 mins ago
        li.list-group-item.d-flex.justify-content-between 取得新訂單 $100
          small 5 mins ago
</template>

<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/stores/global';
const globalStore = useGlobalStore()
const toastInfoEl = ref(null)
const onShowInfo =() => {
  if(!toastInfoEl.value) return
  const toast = new bootstrap.Toast(toastInfoEl.value)
  toast.show()
}
</script>

<style lang="sass" scoped>
.row 
  border-block-end: 1px solid var(--bs-secondary)
.nav-link
  color: var(--bs-secondary)
  transition: all 0.2s

.router-link-exact-active
  color: var(--bs-dark)
  font-weight: bold
  transition: all 0.3s
</style>
