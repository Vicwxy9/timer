/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import PeriodDatabase from "@db/period-database"
import { after, compare, getDateString } from "@util/period"
import { calculate } from "./components/period-calculator"

const periodDatabase = new PeriodDatabase(chrome.storage.local)

export type PeriodQueryParam = {
    /**
     * Required
     */
    periodRange: timer.period.KeyRange
}

function add(timestamp: number, milliseconds: number): Promise<void> {
    const results = calculate(timestamp, milliseconds)
    return periodDatabase.accumulate(results)
}

function dateStrBetween(startDate: timer.period.Key, endDate: timer.period.Key): string[] {
    const result = []
    while (compare(startDate, endDate) <= 0) {
        result.push(getDateString(startDate))
        startDate = after(startDate, 1)
    }
    return result
}


async function list(param?: PeriodQueryParam): Promise<timer.period.Result[]> {
    const [start, end] = param?.periodRange || []
    const allDates = dateStrBetween(start, end)
    return periodDatabase.getBatch(allDates)
}

class PeriodService {
    add = add
    list = list
}

export default new PeriodService()
