<template lang="pug">
button.btn.btn-secondary.position-relative.mb-1.btn-alert(@click="onShowInfo")
  Icon(:icon="['fas', 'fa-bell']")
  span.position-absolute.top-0.start-100.translate-middle.badge.rounded-pill.bg-danger(v-if="newAlertLength >0") {{ newAlertLength }}
.toast-container.position-fixed.top-0.end-0.p-3
  .toast(ref="toastInfoEl")
    .toast-header
      strong.me-auto 訊息
      button.btn-close(
        type="button"
        data-bs-dismiss="toast"
        aria-label="Close"
      )
    .toast-body
      template(v-if="newAlertLength === 0")
        .text-center.text-secondary 沒有新訊息
      ul.list-group(v-else)
        li.list-group-item.d-flex.justify-content-between.pointer(
          v-for="(item,index) in alerts"
          :key="item.id"
          :class="item.isRead ? 'bg-white': 'bg-secondary text-white'"
          @click="gotoOrder(item.id, index)"
        )
          | {{ item.value }}
          small(:class="item.isRead ? 'text-secondary': 'text-white'")
            | {{ dayjs().to(dayjs(new Date())) }}
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { useAdminOrderStore } from '../stores/adminOrder'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
dayjs.extend(relativeTime)
const adminStore = useAdminOrderStore()
const { alerts, newAlertLength } = storeToRefs(adminStore)
const toastInfoEl = ref(null)
const router = useRouter()
let toast
const onShowInfo = () => {
  if (!toastInfoEl.value) return
  toast.show()
}
const gotoOrder = (id, index) => {
  alerts.value[index].isRead = true
  router.push({ name: 'AdminOrderInfo', params: { orderId: id } })
}
const handelClick = (e) => {
  const btn = e.target.closest('.btn-alert')
  const toastEl = e.target.closest('.toast')
  const isShown = toast.isShown() || false
  if (btn || toastEl) return
  if (isShown && toastEl == null) {
    toast.hide()
  }
}
onMounted(async () => {
  document.addEventListener('click', handelClick)
  if (!toastInfoEl.value) return
  await nextTick()
  // eslint-disable-next-line
  toast = new bootstrap.Toast(toastInfoEl.value, { autohide: false })
})
onUnmounted(() => {
  document.removeEventListener('click', handelClick)
})
</script>

<style lang="sass" scoped>
</style>
