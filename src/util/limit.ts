export function matches(item: timer.limit.Item, url: string): boolean {
    const regular = new RegExp(`^${(item?.cond || '').split('*').join('.*')}`)
    return regular.test(url)
}

export function hasLimited(item: timer.limit.Item): boolean {
    const { time, waste = 0 } = item || {}
    if (!time) return false
    return waste >= time * 1000
}

export const checkImpact = (p1: timer.limit.Period, p2: timer.limit.Period): boolean => {
    if (!p1 || !p2) return false
    const [s1, e1] = p1
    const [s2, e2] = p2
    return (s1 >= s2 && s1 <= e2) || (s2 >= s1 && s2 <= e1)
}

export const mergePeriod = (target: timer.limit.Period, toMerge: timer.limit.Period) => {
    if (!target || !toMerge) return
    target[0] = Math.min(target[0], toMerge[0])
    target[1] = Math.max(target[1], toMerge[1])
}

export const sortPeriod = (p1: timer.limit.Period, p2: timer.limit.Period): number => {
    const [s1 = 0, e1 = 0] = p1 || []
    const [s2 = 0, e2 = 0] = p2 || []
    return s1 === s2 ? e1 - e2 : s1 - s2
}

const idx2Str = (time: number): string => {
    time = time ?? 0
    const hour = Math.floor(time / 60)
    const min = time - hour * 60
    const hourStr = (hour < 10 ? "0" : "") + hour
    const minStr = (min < 10 ? "0" : "") + min
    return `${hourStr}:${minStr}`
}

export const date2Idx = (date: Date): number => date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()

export const dateMinute2Idx = (date: Date): number => {
    const hour = date.getHours()
    const min = date.getMinutes()
    return hour * 60 + min
}

export const period2Str = (p: timer.limit.Period): string => {
    const [start, end] = p || []
    return `${idx2Str(start)}-${idx2Str(end)}`
}
