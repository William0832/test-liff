<template lang="pug">
.the-input-wrapper
  label(:class="isFocus ? 'focus' : ''") {{ label }}
  input.form-control(
    :type="type"
    v-model="proxyValue"
    :min="min"
    :max="max"
    @focus="setFocus(true)"
    @blur="setFocus(false)"
  )
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
const props = defineProps({
  modelValue: { type: [String, Number], required: true },
  label: { type: String, default: '' },
  type: {
    type: String,
    default: 'text'
  },
  min: {
    type: [String, null],
    default: null
  },
  max: {
    type: [String, null],
    default: null
  }
})
const emits = defineEmits(['update:modelValue'])
const proxyValue = computed({
  get: () => props.modelValue,
  set: (nv) => {
    emits('update:modelValue', nv)
  }
})
const isFocus = ref(false)
const setFocus = (nv) => {
  if (props.type.includes('date')) {
    isFocus.value = true
    return
  }
  if (!nv && proxyValue.value !== '') {
    return
  }
  isFocus.value = nv
}
watchEffect(() => {
  if (props.type.includes('time') || props.type.includes('date')) {
    setFocus(true)
    return
  }
  setFocus(!!proxyValue.value)
})
</script>

<style lang="sass" scoped>
.the-input-wrapper
  position: relative
  label
    transition: .25s
    position: absolute
    top: 14px
    left: 12px
    font-size: 1rem
    color: rgba(black, 0.5)

    &.focus
      font-size: 0.85rem
      top: 2px
      color: rgba(blue, 0.7)
  input
    padding-top: 1.1rem
</style>
