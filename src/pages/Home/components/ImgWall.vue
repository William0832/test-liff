<template lang="pug">
.img-wall
  img.img-fluid(:src="imgs[0]", alt="shop-img")
</template>

<script setup>
const props = defineProps({
  imgs: {
    type: Array,
    default: () => []
  }
})
</script>
<style lang="sass">
.img-wall
  padding-block: 5px
  padding-inline: 10px
  img
    margin-inline: auto
    display: block
    width: 100%
    max-width: 500px
    // margin-block: auto
    // width: 100%
    // height: 100%
</style>
