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
  MyPagination(:max="pagination.max", v-model:page="pagination.page" v-model:take="pagination.take")
</template>

<script setup>
import { ref, computed } from 'vue'
import MyPagination from '@/components/MyPagination.vue'
const props = defineProps({
  sortData: {
    type: [Object, null],
    default: () => null
  },
  selectedIds: {
    type: Array,
    default: () => null
  },
  title: {
    type: String,
    default: ''
  },
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
  },
  idName: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
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
const emits = defineEmits(['updatePagination', 'update:sortData', 'updateSelect'])

const tbody = ref(null)

const defaultSelectedIds = computed({
  get: () => props.selectedIds,
  sett: (nv) => {
    emits('updateSelect', { ids: nv })
  }
})

const orderTypeList = computed(() => {
  if (!props.sortData) return ''
  return props.cols.map(col => {
    if (col.value === props.sortData.key) {
      return props.sortData.type
    }
    return ''
  })
})
const onSort = (key) => {
  if (!props.sortData) return
  if (props.sortData.key === key) {
    const type = props.sortData.type === ''
      ? 'desc'
      : props.sortData.type === 'asc' ? '' : 'asc'
    emits('update:sortData', { key, type })
    return
  }
  emits('update:sortData', { key, type: 'desc' })
}
const onSelect = (checked, value) => {
  if (value === 'all') {
    defaultSelectedIds.value = checked ? props.rows.map(item => item[`${props.idName}Id`]) : []
    return
  }
  defaultSelectedIds.value = defaultSelectedIds.value.includes(value)
    ? defaultSelectedIds.value.filter(item => item !== value)
    : [...defaultSelectedIds.value, value]
}
const currentPage = computed({
  get: () => props.pagination ? props.pagination.page : 1,
  set (nv) {
    emits('updatePagination', nv)
  }
})

</script>

<style lang="sass" scoped>
tr[data-is-sort="true"] > th
  cursor: pointer
  &[data-sort-type="asc"]::after
    content: '↑'
  &[data-sort-type="desc"]::after
    content: '↓'

</style>
