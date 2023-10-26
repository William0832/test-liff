<template lang="pug">
.card
  slot(name="header").card-header
  .card-body
    h5.card-title(v-if="title") {{ title }}
    .card-text
      slot
  slot(name="footer").card-footer

</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

</script>

<style lang="sass" scoped>
</style>
