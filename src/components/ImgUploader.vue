<template lang="pug">
.img-uploader(@click="uploadFile" :class="{empty: path === ''}")
  .img-box
    img(:src="path", alt="upload food image" crossOrigin="anonymous")
    input(
      type="file"
      accept="image/*"
      @input.prevent.stop="inputFile"

    )
</template>

<script setup>
import { ref, computed } from 'vue'
const emits = defineEmits(['update:path', 'update:file'])
const props = defineProps({
  path: { type: String, default: '' },
  file: { type: Object, default: null }
})
const inputFile = (e) => {
  const { files } = e.target
  const url = files.length === 0
    ? ''
    : URL.createObjectURL(files[0])
  emits('update:path', url)
  if (url === '') return
  emits('update:file', files[0])
}
</script>

<style lang="sass" scoped>
.empty
  border: 1px dashed rgba(black, 0.3)
.img-uploader
  width: 100%
  display: flex
  flex-direction: column
  padding: 0.5rem
  cursor: pointer

  .img-box
    cursor: pointer
    position: relative
    margin-bottom: .5rem
  img
    border-radius: 4px
    cursor: pointer
    display: block
    width: 100%
    max-height: 300px
    object-fit: contain
    min-height: 40px
  input
    top: 0
    left: 0
    position: absolute
    opacity: 0
    width: 100%
    height: 100%
    cursor: pointer
</style>
