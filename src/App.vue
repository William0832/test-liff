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
// import { useGapi } from 'vue-gapi'
// const gApi = useGapi()
const menuStore = useMenuStore()


const module = reactive({
  message: '',
  error: '',
  isLogin: false
})

onMounted(async () => {
  try {
    await liff.init({
      liffId: import.meta.env.VITE_LIFF_ID,
      withLoginOnExternalBrowser: true
    })
    module.isLogin = liff.isLoggedIn()
    module.message = 'LIFF init succeeded.'
  } catch (err) {
    module.message = 'LIFF init failed.'
    module.error = `${err}`
  }
  // try {
  //   const res = await gApi.login()
  //   console.log(res)
  // } catch (err) {
  //   console.error(err)
  //   module.error = `${err.details}`
  // }
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
