<template lang="pug">
.container-fluid.position-relative.d-flex.flex-column.p-0.h-100
  MyLoading(v-if="!isLineLogin")
  template(v-else)
    router-view
    Footer
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { debug, ok } from '@/utils/swal.js'
import MyLoading from './components/MyLoading.vue'
import Footer from './components/Footer.vue'
import { useUserStore } from './stores/user'
const userStore = useUserStore()
const { isLineLogin } = storeToRefs(userStore)
onMounted(async () => {
  try {
    await userStore.getLineUserData()
    const { name } = userStore.userData
    if (name) ok(`Welcome ${name}`)
  } catch (err) {
    debug(err)
  }
})
</script>

<style lang="sass">
body
  position: relative
.center
  display: flex
  align-items: center
  justify-content: center
.nav-link
  color: var(--bs-secondary)
  transition: all 0.2s

.router-link-active
  color: var(--bs-dark) !important
  font-weight: bold
  transition: all 0.3s
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
