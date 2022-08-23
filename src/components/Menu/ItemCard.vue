<template lang="pug">
.border-bottom.row.w-100.m-0.p-2.item
  .col-7.d-block
    .p-1.fw-semibold {{ name }}
    .p-1.fw-semibold ${{ price }}
  .col.d-flex.align-items-center.justify-content-end
    img.img-fluid.rounded(src="https://fakeimg.pl/200/", alt="", srcset="")
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
.item
  cursor: pointer
</style>