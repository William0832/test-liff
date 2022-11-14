<template lang="pug">
.form-check.form-switch
  input.form-check-input(
    type="checkbox"
    :checked="modalValue"
    :value="modalValue"
    @click.prevent="$emit('update:modalValue', $event.target.checked)"
    ref="inputEl"
  )
</template>

<script setup>
import { computed, watch, ref, onUpdated } from 'vue'
const emits = defineEmits(['update:modalValue'])
const props = defineProps({
  modalValue: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="sass" scoped>
</style>
