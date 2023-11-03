<template lang="pug">
.border-bottom.row.w-100.m-0.p-2.item(
  :class="{ 'sold-out': props.isSoldOut }"
)
  .col-7.d-block
    .p-1.fw-semibold {{ name }}
    .p-1.fw-semibold ${{ price }}
    .p-1.fw-semibold.text-secondary {{ info }}

  .col.d-flex.align-items-center.justify-content-end
    img.img-fluid.rounded.food-img(:src="img || 'images/noImg.png'", alt="", srcset="")

</template>

<script setup>
const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  },
  img: {
    type: String,
    default: () => ''
  },
  info: {
    type: String,
    default: ''
  },
  isSoldOut: {
    type: Boolean,
    default: false
  },
  name: { type: String, default: '' },
  price: { type: Number, default: 0 }
})
</script>
<style lang="sass">
.item
  cursor: pointer
.food-img
  object-fit: cover
  width: 150px
  height: 100px
</style>
