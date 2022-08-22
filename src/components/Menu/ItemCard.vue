<template lang="pug">
.menu-item.d-flex.justify-content-between.border-bottom(
  @click="router.push({ name: 'MenuItem', params: { id } })"
)
  .start.d-block
    .title.p-1 {{ name }}
    .price.p-1 ${{ price }}
  .end 
    img(src="https://fakeimg.pl/50/", alt="", srcset="")
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
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
  background-color: white
</style>