<template lang="pug">
.form-check
  label
    input(
      type="radio"
      :name="name"
      :value="value"
      v-model="proxyValue"
    ).form-check-input
    | {{ label }}
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
const emits = defineEmits('update:modelValue')
const proxyValue = computed({
  get: () => props.modelValue,
  set: (nv) => emits('update:modelValue', nv)
})
</script>

<style lang="sass" scoped>
</style>
