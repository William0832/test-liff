import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePageStore = defineStore('page', () => {
  const defaultTake = ref(5)
  const pagination = ref({
    max: 1,
    page: 1,
    take: computed({
      get: () => defaultTake.value,
      set: (nv) => {
        defaultTake.value = nv
        pagination.value.page = 1
      }
    }),
    orderBy: 'id',
    orderType: 'asc'
  })
  const skip = computed(() => {
    const { page, take } = pagination.value
    return take * (page - 1)
  })
  const setMax = (total) => {
    pagination.value.max = !total ? 1 : Math.ceil(total / defaultTake.value)
  }
  const setOrderBy = ({ by = 'id', type = 'asc' }) => {
    pagination.value.orderBy = by
    pagination.value.orderType = type
  }
  return {
    pagination,
    skip,
    setMax,
    setOrderBy
  }
})
