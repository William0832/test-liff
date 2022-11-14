<template lang="pug">
.table-box.table-responsive
  slot(name="header").table-table-box__header
  table.table
    slot(name="thead" :props="props")
      thead
        tr(:data-is-sort="!!pagination.orderBy")
          slot(v-for="col in defaultCols" :key="col.value" :name="`th-${col.key}`" :col="col")
            th(:data-sort-by="col.value === pagination.orderBy ? pagination.orderBy : null") {{col.label}}
    slot(name="tbody" :props="props")
      tbody(v-if="rows.length > 0")
        slot(v-for="(row, index) in rows" :key="row.id" :name="`tr-${index}`" :row="row")
          tr
            slot(v-for="col in defaultCols" :name="col.key" :row="row" :item="row[col.key]")
              td {{row[col.key]}}
      tbody.align-middle(v-else)
        tr.text-center
          td(:colspan="defaultCols.length") 沒有資料
  MyPagination(
    :max="pagination.max"
    v-model:page="pagination.page"
    v-model:take="pagination.take")
</template>

<script setup>
import { ref, computed } from 'vue'
import MyPagination from '@/components/MyPagination.vue'
const props = defineProps({
  cols: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => ({
      max: 1,
      page: 1,
      size: 10
    })
  }
})
const defaultCols = computed(() => {
  if (props.cols.length !== 0) return props.cols
  if (props.rows.length === 0) return []
  return Object.keys(props.rows).map(e => ({
    label: e,
    key: e
  }))
})
const tbody = ref(null)
</script>

<style lang="sass" scoped>
tr[data-is-sort="true"] > th
  cursor: pointer
  &[data-sort-type="asc"]::after
    content: '↑'
  &[data-sort-type="desc"]::after
    content: '↓'

</style>
