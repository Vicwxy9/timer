import { useWindowSize } from "@vueuse/core"
import { computed } from "vue"

export type MediaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const computeMediaSize = (width: number): MediaSize => {
    if (width < 768) {
        return 'xs'
    } else if (width < 992) {
        return 'sm'
    } else if (width < 1200) {
        return 'md'
    } else if (width < 1920) {
        return 'lg'
    } else {
        return 'xl'
    }
}

export const useMediaSize = () => {
    const { width } = useWindowSize()
    const size = computed<MediaSize>(() => computeMediaSize(width.value))
    return size
}