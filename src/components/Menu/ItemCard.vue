<template lang="pug">
.menu-item.d-flex.justify-content-between.border-bottom(
  @click="$router.push({ name: 'MenuItem', params: { id } })"
)
  .start.d-block.m-2
    .title.p-1 {{ name }}
    .price.p-1 ${{ price }}
  .end.d-flex.align-items-center.m-2
    img(src="https://fakeimg.pl/100/", alt="", srcset="")
</template>

<script setup>
const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  },
  name: { type: String, default: '' },
  price: { type: Number, default: 0 }
})
</script>
<style lang="sass">
.menu-item
  height: 50%
</style>