<template lang="pug">
.menu-item.d-flex.justify-content-between.border-bottom
  .start.d-block
    .title.p-1 {{ name }}
    .price.p-1 ${{ price }}
  .end 
    img(src="https://fakeimg.pl/50/", alt="", srcset="")
</template>

<script setup>
const props = defineProps({
  name: { type: String, default: '' },
  price: { type: Number, default: 0 }
})
</script>
<style lang="sass">
.menu-item
  height: 50%
  background-color: white
</style>