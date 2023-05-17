/**
 * Copyright (c) 2021-present Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import resource from './data-manage-resource.json'

export type DataManageMessage = {
    totalMemoryAlert: string
    totalMemoryAlert1: string
    usedMemoryAlert: string
    operationAlert: string
    filterItems: string
    filterFocus: string
    filterTime: string
    filterDate: string
    unlimited: string
    paramError: string
    deleteConfirm: string
    deleteSuccess: string
    migrationAlert: string
    importError: string
    migrated: string
    dateShortcut: {
        tillYesterday: string
        till7DaysAgo: string
        till30DaysAgo: string
    }
}

const _default: Messages<DataManageMessage> = resource

export default _default