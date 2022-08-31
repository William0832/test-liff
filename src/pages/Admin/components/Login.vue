<template lang="pug">
.container.form-control.mt-5
  label.form-label(for="account") 帳號
  input.form-control#account(type="text" v-model="admin.account").mb-2
  label.form-label(for="psw") 密碼
  input.form-control#psw(type="password" v-model="admin.psw").mb-3
  button.btn.btn-primary.w-100.mb-2(@click="login")  登入
</template>

<script setup>
import { reactive } from 'vue'
import { useGlobalStore } from '@/stores/global.js'
const globalStore = useGlobalStore()
const admin = reactive({
  account: '',
  psw: ''
})
const login = async () => {
  await globalStore.login(account, psw)
}
</script>

<style lang="sass" scoped>
.container
  max-width: 500px
</style>
