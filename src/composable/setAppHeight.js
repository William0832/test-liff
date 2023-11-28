import { onMounted, onUnmounted, ref, watchEffect, nextTick } from 'vue'
export function setAppHeight () {
  const height = ref()
  const handelSize = (e) => {
    height.value = window.innerHeight
  }
  onMounted(() => {
    handelSize()
    window.addEventListener('resize', handelSize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', handelSize)
  })
  watchEffect(async () => {
    await nextTick()
    document.documentElement
      .style.setProperty('--window-height', `${height.value}px`)
  })
  return { height }
}
