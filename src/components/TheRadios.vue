<template lang="pug">
.radio-wrapper.border.rounded.p-2.px-3
  strong.title {{ title }}
  .d-flex.gap-2.flex-wrap.wrapper.mt-2
    template(v-for="(e,i) in options" :key="i")
      TheRadio(
        v-model="proxyValue"
        :name="name"
        :value="e.value"
        :label="e.label"
      )
</template>

<script setup>
import TheRadio from '@/components/TheRadio.vue'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update:modelValue'])
const proxyValue = computed({
  get: () => props.modelValue,
  set: (nv) => emits('update:modelValue', nv)
})
</script>

<style lang="sass" scoped>
.wrapper
  max-width: 400px
</style>
