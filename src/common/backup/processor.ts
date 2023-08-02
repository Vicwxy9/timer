/**
 * Copyright (c) 2022 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import BackupDatabase from "@db/backup-database"
import metaService from "@service/meta-service"
import optionService from "@service/option-service"
import statService from "@service/stat-service"
import MonthIterator from "@util/month-iterator"
import { judgeVirtualFast } from "@util/pattern"
import { formatTime, getBirthday } from "@util/time"
import GistCoordinator from "./gist/coordinator"

const storage = chrome.storage.local
const syncDb = new BackupDatabase(storage)

class CoordinatorContextWrapper<Cache> implements timer.backup.CoordinatorContext<Cache>{
    auth: string
    cache: Cache
    type: timer.backup.Type
    cid: string

    constructor(cid: string, auth: string, type: timer.backup.Type) {
        this.cid = cid
        this.auth = auth
        this.type = type
    }

    async init(): Promise<timer.backup.CoordinatorContext<Cache>> {
        this.cache = await syncDb.getCache(this.type) as Cache
        return this
    }

    handleCacheChanged(): Promise<void> {
        return syncDb.updateCache(this.type, this.cache)
    }
}

/**
 * Declare type of NavigatorUAData
 */
type NavigatorUAData = {
    brands?: {
        brand?: string
        version?: string
    }[]
    platform?: string
}

type Result<T> = {
    success: boolean
    errorMsg?: string
    data?: T
}

function error<T>(msg: string): Result<T> {
    return { success: false, errorMsg: msg, }
}

function success<T>(data?: T): Result<T> {
    return { success: true, data }
}

function generateCid() {
    const uaData = (navigator as any)?.userAgentData as NavigatorUAData
    let prefix = 'unknown'
    if (uaData) {
        const brand: string = uaData.brands
            ?.map(e => e.brand)
            ?.filter(brand => brand !== "Chromium" && !brand.includes("Not"))
            ?.[0]
            ?.replace(' ', '-')
            || undefined
        const platform: string = uaData.platform
        brand && platform && (prefix = `${platform.toLowerCase()}-${brand.toLowerCase()}`)
    }
    return prefix + '-' + new Date().getTime()
}

/**
 * Get client id or generate it lazily
 */
async function lazyGetCid(): Promise<string> {
    let cid = await metaService.getCid()
    if (!cid) {
        cid = generateCid()
        await metaService.updateCid(cid)
    }
    return cid
}

async function syncFull(
    context: timer.backup.CoordinatorContext<unknown>,
    coordinator: timer.backup.Coordinator<unknown>,
    client: timer.backup.Client
): Promise<timer.backup.Snapshot> {
    // 1. select rows
    let start = getBirthday()
    let end = new Date()
    const rows = await statService.select({ date: [start, end] })
    const allDates = rows.map(r => r.date).sort((a, b) => a == b ? 0 : a > b ? 1 : -1)
    client.maxDate = allDates[allDates.length - 1]
    client.minDate = allDates[0]
    // 2. upload
    try {
        await coordinator.upload(context, rows)
    } catch (error) {
        console.log(error)
    }
    return {
        ts: end.getTime(),
        date: formatTime(end, '{y}{m}{d}')
    }
}

function filterClient(c: timer.backup.Client, localClientId: string, start: string, end: string) {
    // Excluse local client
    if (c.id === localClientId) return false
    // Judge range
    if (start && c.maxDate && c.maxDate < start) return false
    if (end && c.minDate && c.minDate > end) return false
    return true
}

function filterDate(row: timer.stat.RowBase, start: string, end: string) {
    const { date } = row
    if (!date) return false
    if (start && date < start) return false
    if (end && date > end) return false
    return true
}

export type RemoteQueryParam = {
    start: Date
    end: Date
    specCid?: string
}

class Processor {
    coordinators: {
        [type in timer.backup.Type]: timer.backup.Coordinator<unknown>
    }

    constructor() {
        this.coordinators = {
            none: undefined,
            gist: new GistCoordinator()
        }
    }

    async syncData(): Promise<Result<number>> {
        const [option, auth, type, coordinator, errorMsg] = await this.checkAuth()
        if (errorMsg) return error(errorMsg)

        const cid = await lazyGetCid()
        const context: timer.backup.CoordinatorContext<unknown> = await new CoordinatorContextWrapper<unknown>(cid, auth, type).init()
        const client: timer.backup.Client = {
            id: cid,
            name: option.clientName,
            minDate: undefined,
            maxDate: undefined
        }
        let snapshot: timer.backup.Snapshot = await syncFull(context, coordinator, client)
        await syncDb.updateSnapshot(type, snapshot)
        const clients: timer.backup.Client[] = (await coordinator.listAllClients(context)).filter(a => a.id !== cid) || []
        clients.push(client)
        await coordinator.updateClients(context, clients)
        // Update time
        const now = Date.now()
        metaService.updateBackUpTime(type, now)
        return success(now)
    }

    async listClients(): Promise<Result<timer.backup.Client[]>> {
        const [_, auth, type, coordinator, errorMsg] = await this.checkAuth()
        if (errorMsg) return error(errorMsg)
        const cid = await lazyGetCid()
        const context: timer.backup.CoordinatorContext<unknown> = await new CoordinatorContextWrapper<unknown>(cid, auth, type).init()
        const clients = await coordinator.listAllClients(context)
        return success(clients)
    }

    async checkAuth(): Promise<[timer.option.BackupOption, string, timer.backup.Type, timer.backup.Coordinator<unknown>, string]> {
        const option = (await optionService.getAllOption()) as timer.option.BackupOption
        const auth = option?.backupAuths?.[option.backupType || 'none']

        const type = option?.backupType
        const coordinator: timer.backup.Coordinator<unknown> = type && this.coordinators[type]
        if (!coordinator) {
            // no coordinator, do nothing
            return [option, auth, type, coordinator, "Invalid type"]
        }

        const errorMsg = await this.test(type, auth)
        return [option, auth, type, coordinator, errorMsg]
    }

    async query(type: timer.backup.Type, auth: string, param: RemoteQueryParam): Promise<timer.stat.Row[]> {
        const { start, end, specCid } = param
        const coordinator: timer.backup.Coordinator<unknown> = this.coordinators?.[type]
        if (!coordinator) return []
        let localCid = await metaService.getCid()
        // 1. init context
        const context: timer.backup.CoordinatorContext<unknown> = await new CoordinatorContextWrapper<unknown>(localCid, auth, type).init()
        // 2. query all clients, and filter them
        let startStr = start ? formatTime(start, '{y}{m}{d}') : undefined
        let endStr = end ? formatTime(end, '{y}{m}{d}') : undefined
        const allClients = (await coordinator.listAllClients(context))
            .filter(c => filterClient(c, localCid, startStr, endStr))
            .filter(c => !specCid || c.id === specCid)
        // 3. iterate month and clients
        const result: timer.stat.Row[] = []
        const allYearMonth = new MonthIterator(start, end || new Date()).toArray()
        await Promise.all(allClients.map(async client => {
            const { id, name } = client
            await Promise.all(allYearMonth.map(async ym => {
                (await coordinator.download(context, ym, id))
                    .filter(row => filterDate(row, startStr, endStr))
                    .forEach(row => result.push({
                        ...row,
                        cid: id,
                        cname: name,
                        mergedHosts: [],
                        virtual: judgeVirtualFast(row.host),
                    }))
            }))
        }))
        console.log(`Queried ${result.length} remote items`)
        return result
    }

    async test(type: timer.backup.Type, auth: string): Promise<string> {
        const coordinator: timer.backup.Coordinator<unknown> = this.coordinators?.[type]
        if (!coordinator) {
            return 'Invalid type'
        }
        return coordinator.testAuth(auth)
    }

    async clear(cid: string): Promise<Result<void>> {
        const [_, auth, type, coordinator, errorMsg] = await this.checkAuth()
        if (errorMsg) return error(errorMsg)

        let localCid = await metaService.getCid()
        const context: timer.backup.CoordinatorContext<unknown> = await new CoordinatorContextWrapper<unknown>(localCid, auth, type).init()
        await coordinator.clear(context, cid)

        return success()
    }
}

export default new Processor()