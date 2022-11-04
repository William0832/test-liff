<template lang="pug">
.table-box.table-responsive
  slot(name="header").table-table-box__header
  table.table
    slot(name="thead" :props="props")
      thead
        tr
          slot(v-for="col in defaultCols" :key="col.value" :name="`th-${col.key}`" :col="col")
            th {{col.label}}
    slot(name="tbody" :props="props")
      tbody
        slot(v-for="(row, index) in rows" :key="row.id" :name="`tr-${index}`" :row="row")
          tr
            slot(v-for="col in defaultCols" :name="col.key" :row="row" :item="row[col.key]")
              td {{row[col.key]}}

</template>

<script setup>
// import Loading from '@/components/Loading'
import { ref, computed } from 'vue'
// import MyCheckbox from './MyCheckbox.vue'
// import Pagination from './Pagination.vue'
const props = defineProps({
  sortData: {
    // {key: [colName], type: 'asc' or 'desc'}
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
// .table-box
//   &__body
//     width: 100%
//     min-width: 1200px
//     table
//       font-size: .875rem
//       color: #77757F
//       border-radius: var(--bdrs-size)var(--bdrs-size) 0 0
//       border-collapse: collapse
//       overflow: hidden
//       max-height: 500px
//     tr
//       height: 60px
//     th, td
//       padding: 0 10px
//       text-align: left
//       &:first-child
//         padding-left: 20px
//       &:last-child
//         padding-right: 20px
//     td[name="check"], th[name="check"]
//       text-align: center
//     td[name="action"], th[name="action"]
//       text-align: right
//     thead
//       background-color: #fff
//       tr > th
//         color: #7A869E
//         size: 16px
//         font-weight: 400
//     tbody
//       overflow: auto
//       box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.05)
//       tr
//         box-shadow: inset 0px -1px 0px #ECF0F8
//         &:hover
//           background-color: rgba(#f3EFFF, 0.5)
//       td
//         color: #2A3950
//   &__loading
//     position: relative
// .sticky-head
//   .table-box__body table
//     overflow: inherit
//   .table-box__body thead
//     background-color: var(--c-bg-default)
//     position: sticky
//     top: 0
tr[data-can-sort="true"] > th > .label
  cursor: pointer
  &[data-order-type="asc"]::after
    content: '↑'
  &[data-order-type="desc"]::after
    content: '↓'

</style>
