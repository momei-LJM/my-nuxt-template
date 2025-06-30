import { ref } from 'vue'

interface PaginationParams {
  pageSize?: number
  currentPage?: number
  total?: number
  callback?: (data?: any) => any
}

interface UsePaginationReturn {
  pageSize: Ref<number>
  currentPage: Ref<number>
  total: Ref<number>
  pageSizes: number[]
  handleSizeChange: (val: number) => void
  handleCurrentChange: (val: number) => void
  resetPagination: () => void
}

export const usePagination = (
  params?: PaginationParams,
): UsePaginationReturn => {
  const pageSize = ref(params?.pageSize || 10)
  const currentPage = ref(params?.currentPage || 1)
  const total = ref(params?.total || 0)
  const pageSizes = [10, 20, 50, 100]

  const handleSizeChange = (val: number) => {
    pageSize.value = val
    currentPage.value = 1
    params?.callback?.()
  }

  const handleCurrentChange = (val: number) => {
    currentPage.value = val
    params?.callback?.()
  }

  const resetPagination = () => {
    pageSize.value = params?.pageSize || 10
    currentPage.value = params?.currentPage || 1
    total.value = params?.total || 0
    params?.callback?.()
  }

  return {
    pageSize,
    currentPage,
    total,
    pageSizes,
    handleSizeChange,
    handleCurrentChange,
    resetPagination,
  }
}
