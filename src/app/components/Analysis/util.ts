/**
 * Copyright (c) 2022 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { t } from "@app/locale"

/**
 * Transfer host info to label
 */
export function labelOfHostInfo(site: timer.site.SiteKey): string {
    if (!site) return ''
    const { host, merged, virtual } = site
    if (!host) return ''
    let label = ''
    merged && (label = `[${t(msg => msg.analysis.common.merged)}]`)
    virtual && (label = `[${t(msg => msg.analysis.common.virtual)}]`)
    return `${host}${label}`
}

export type RingValue = [number, number]

/**
 * Compute ring text
 *
 * @param ring ring value
 * @param formatter formatter
 * @returns text or '-'
 */
export function computeRingText(ring: RingValue, formatter?: ValueFormatter): string {
    if (!ring) {
        return '-'
    }
    const [current, last] = ring
    if (current === undefined && last === undefined) {
        // return undefined if both are undefined
        return '-'
    }
    const delta = (current || 0) - (last || 0)
    let result = formatter ? formatter(delta) : delta?.toString()
    delta >= 0 && (result = '+' + result)
    return result
}

export type ValueFormatter = (val: number) => string

export const formatValue = (val: number, formatter?: ValueFormatter) => formatter ? formatter(val) : val?.toString() || '-'

export type DimensionEntry = {
    date: string
    value: number
}