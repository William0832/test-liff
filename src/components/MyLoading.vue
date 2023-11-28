<template lang="pug">
Teleport(to="body")
  .loading.center
    slot(name="process")
      .loading__process.center
        img(src="/images/process.gif")
</template>

<script setup>
</script>

<style lang="sass" scoped>
.loading
  background-color: black
  position: fixed
  width: 100%
  height: 100%
  top: 0
  left: 0
  opacity: 0.2
  z-index: 9999
  &__process
    width: 100px
    height: 100px
    img
      width: 100%
</style>
