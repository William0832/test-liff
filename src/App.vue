<template>
  <div>
    <h1>點餐</h1>
    <p>login: {{ module.isLogin }}</p>
    <p v-if='module.message'>{{ module.message }}</p>
    <p v-if='module.error'>
      <code>{{ module.error }}</code>
    </p>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import liff from '@line/liff'
import { useMenuStore } from './stores/menu'

const menuStore = useMenuStore()

console.log(menuStore.items)

const module = reactive({
  message: '',
  error: '',
  isLogin: false
})

onMounted(() => {
  liff
    .init({
      liffId: import.meta.env.VITE_LIFF_ID,
      // withLoginOnExternalBrowser: true
    })
    .then(() => {
      module.isLogin = liff.isLoggedIn()
      module.message = 'LIFF init succeeded.'
    })
    .catch((e) => {
      module.message = 'LIFF init failed.'
      module.error = `${e}`
    })
})
</script>

<style lang="sass">
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

</style>
