<template lang="pug">
.container.mt-5
  .form-control
    label.form-label(for="account") Account
    input.form-control#account(type="text" v-model="admin.account").mb-2
    label.form-label(for="psw") Password
    input.form-control#psw(type="password" v-model="admin.psw").mb-3
    button.btn.btn-primary.w-100.mb-2(@click="login")  Login
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useGlobalStore } from '@/stores/global.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const globalStore = useGlobalStore()
const admin = reactive({
  account: '',
  psw: ''
})
const login = async () => {
  await globalStore.login(reactive.account, reactive.psw)
  router.push({ name: 'OrderTable' })
}
onMounted(() => {
  globalStore.logout()
})
</script>

<style lang="sass" scoped>
.container
  max-width: 500px
</style>
