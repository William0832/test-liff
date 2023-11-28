import { onMounted, onUnmounted } from 'vue'
const defaultOptions = {
  threshold: 1,
  rootMargin: '0px 0px 0px 0px'
}
export function useObserver ({
  root,
  els = [],
  activeCB = () => { },
  options = defaultOptions
}) {
  options = {
    ...options,
    root
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeCB(entry)
        }
      })
    },
    options
  )
  onMounted(() => {
    els.forEach(e => {
      if (e) observer.observe(e)
    })
  })
  onUnmounted(() => {
    observer.disconnect()
  })
  return observer
}
