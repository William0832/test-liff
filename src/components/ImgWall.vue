<template lang="pug">
.img-wall
  img(:src="imgs[0]", alt="")
</template>

<script setup>
const props = defineProps({
  imgs: {
    type: Array,
    default: []
  }
})
</script>
<style lang="sass">
.img-wall
  height: 250px
  img
    width: 100%
    height: 100%
</style>