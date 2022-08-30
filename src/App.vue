<template lang="pug">
.container-fluid.position-relative.d-flex.flex-column.p-0.h-100
  router-view
  Footer
</template>

<script setup>
// import liff from '@line/liff'
// import { onMounted, reactive } from 'vue'
import Footer from './components/Footer.vue'

// const lineUserData = reactive({
//   message: '',
//   error: '',
//   isLogin: false
// })

// onMounted(async () => {
//   try {
//     await liff.init({
//       liffId: import.meta.env.VITE_LIFF_ID,
//       withLoginOnExternalBrowser: false
//     })
//     lineUserData.isLogin = liff.isLoggedIn()
//     lineUserData.message = 'LIFF init succeeded.'
//   } catch (err) {
//     lineUserData.message = 'LIFF init failed.'
//     lineUserData.error = `${err}`
//   }
//   // try {
//   //   const res = await gApi.login()
//   //   console.log(res)
//   // } catch (err) {
//   //   console.error(err)
//   //   module.error = `${err.details}`
//   // }
// })
</script>

<style lang="sass">
:root 
  --f-size: 30px
html, body
  min-width: 375px
  width: 100%
  height: 100%
  padding: 0
  margin: 0
#app
  box-shadow: 0 0 50px 10px rgba(black,0.1)
  background-color: white
  margin-inline: auto
  max-width: 600px
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  height: 100vh
  overflow: auto
.sold-out
  position: relative
  cursor: not-allowed
  &::before
    content: ''
    display: block
    width: 100%
    height: 100%
    background-color: white
    opacity: 0.6
    z-index: 100
    position: absolute
  &::after
    content: 'SOLD OUT'
    display: block
    color: rgba(red, 0.8) 
    font-style: italic
    font-weight: bolder
    font-size: var(--f-size, 10px)
    letter-spacing: 2px
    text-shadow: 1px 2px rgba(red, 0.6) 
    position: absolute
    text-align: center
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 999
</style>
