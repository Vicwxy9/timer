import { ref, Ref } from "vue"

type Option<T> = {
    manual?: boolean
    defaultValue?: T[]
    pageSize?: number
}

type Result<T> = {
    data: Ref<T[]>
    end: Ref<boolean>
    loadMore: () => void
    loadMoreAsync: () => Promise<void>
    loading: Ref<boolean>
}

export const useScrollRequest = <P, T>(getter: (pageNo: number, pageSize: number) => Promise<T[]>, option?: Option<T>): Result<T> => {
    const defaultValue: T[] = option?.defaultValue || []
    const data = ref<T[]>(defaultValue) as Ref<T[]>
    const end = ref(false)
    const loading = ref(false)
    const pageNo = ref(0)
    const pageSize = option?.pageSize || 10

    const loadMoreAsync = async () => {
        if (end.value) return
        try {
            loading.value = true
            const no = pageNo.value = (pageNo.value + 1)
            const newData = await getter?.(no, pageSize) || []
            const newLen = newData?.length ?? 0
            if (!newLen || newLen < pageSize) {
                end.value = true
                return
            }
            data.value = [...(data.value || []), ...(newData || [])]
        } finally {
            loading.value = false
        }
    }

    return {
        data,
        end,
        loading,
        loadMore: () => loadMoreAsync(),
        loadMoreAsync,
    }
}