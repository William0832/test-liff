<template lang="pug">
Teleport(to="body")
  .admin.container-fluid
    h4.mt-2 OHIYO-Admin
    Navbar
    router-view
</template>

<script setup>
import Navbar from './pages/Navbar.vue'
</script>

<style lang="sass" scoped>
.admin
  z-index: 999
  top: 0
  right: 0
  position: absolute
  width: 100%
  min-height: 100vh
  background-color: #fff
</style>
