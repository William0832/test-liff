<template lang="pug">
.pagination-box
  ul.pagination.justify-content-end
    li.page-item.row.me-2
      select.form-select.form-select-sm(
        @change="emits('update:take', +$event.target.value)"
        :value="take"
      )
        option(v-for="e in defaultPageTakes" :value="e") {{e}}
    li.page-item(:class="{disabled: page === 1}")
      .page-link(@click="addPage(-1)")
        span(aria-hidden="true") «
    li.page-item(v-for="p in pageList" :class="{active: p === page}")
      .page-link(@click="setPage(p)") {{p}}
    li.page-item(:class="{disabled: page === max}")
      .page-link(@click="addPage(1)")
        span(aria-hidden="true") »
</template>

<script setup>
import { computed } from 'vue'
const defaultPageTakes = [2, 5, 8, 10, 20]
const emits = defineEmits(['update:page', 'update:take'])
const props = defineProps({
  take: {
    type: Number,
    default: 5
  },
  max: {
    type: Number,
    default: 1
  },
  page: {
    type: Number,
    default: 1
  }
})
const pageList = computed(() => Array(props.max).fill('').map((e, i) => i + 1))
const checkPageIsValid = (page) => {
  if (page < 1 || page > props.amx) return false
  return true
}
const setPage = (p) => {
  if (!checkPageIsValid(p)) return
  emits('update:page', p)
}
const addPage = (add) => {
  const page = props.page + add
  if (!checkPageIsValid(page)) return
  emits('update:page', page)
}
</script>

<style lang="sass" scoped>
</style>
