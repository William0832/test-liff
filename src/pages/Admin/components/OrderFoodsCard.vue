<template lang="pug">
ul.list-group
  li.list-group-item(v-for="e in foods")
    .order-food {{e?.food?.name}} x {{e?.amount}}
</template>

<script setup>
const props = defineProps({
  foods: {
    type: Array,
    default: () => []
  }
})

</script>

<style lang="sass" scoped>
</style>
