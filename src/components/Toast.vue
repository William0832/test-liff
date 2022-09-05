<template lang="pug">
teleport(to="#app").toast
  .toast__msg-box
    .toast__msg {{ msg }}
</template>

<script setup>
import { onMounted, ref } from 'vue'
const isShow = ref(true)
const props = defineProps({
  msg: {
    type: String,
    default: ''
  },
  timeout: {
    type: Number,
    default: 2000
  }
})
onMounted(async () => {
  // console.log(isShow.ref, props.timeout)
  // await new Promise((resolve, reject) => resolve(setTimeout(() => isShow.ref = false, props.timeout)))
  // console.log(isShow.ref, props.timeout)

})
</script>

<style lang="sass" scoped>

</style>
