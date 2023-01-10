/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export type ItemMessage = {
    date: string
    host: string
    focus: string
    time: string
    operation: {
        label: string
        delete: string
        add2Whitelist: string
        removeFromWhitelist: string
        deleteConfirmMsgAll: string
        deleteConfirmMsgRange: string
        deleteConfirmMsg: string
        jumpToTrend: string
        exportWholeData: string
        importWholeData: string
    }
}

const _default: Messages<ItemMessage> = {
    zh_CN: {
        date: '日期',
        host: '域名',
        focus: '浏览时长',
        time: '打开次数',
        operation: {
            label: '操作',
            delete: '删除',
            add2Whitelist: '白名单',
            removeFromWhitelist: '启用',
            jumpToTrend: '趋势',
            deleteConfirmMsgAll: '{url} 的所有访问记录将被删除',
            deleteConfirmMsgRange: '{url} 在 {start} 到 {end} 的访问记录将被删除',
            deleteConfirmMsg: '{url} 在 {date} 的访问记录将被删除',
            exportWholeData: '导出数据',
            importWholeData: '导入数据',
        },
    },
    zh_TW: {
        date: '日期',
        host: '域名',
        focus: '瀏覽時長',
        time: '訪問次數',
        operation: {
            label: '操作',
            delete: '刪除',
            add2Whitelist: '白名單',
            removeFromWhitelist: '啟用',
            jumpToTrend: '趨勢',
            deleteConfirmMsgAll: '{url} 的所有拜訪記錄將被刪除',
            deleteConfirmMsgRange: '{url} 在 {start} 到 {end} 的拜訪記錄將被刪除',
            deleteConfirmMsg: '{url} 在 {date} 的拜訪記錄將被刪除',
            exportWholeData: '導出數據',
            importWholeData: '導入數據',
        },
    },
    en: {
        date: 'Date',
        host: 'Site URL',
        focus: 'Browsing Time',
        time: 'Site Visits',
        operation: {
            label: 'Operations',
            delete: 'Delete',
            add2Whitelist: 'Whitelist',
            removeFromWhitelist: 'Enable',
            jumpToTrend: 'Trend',
            deleteConfirmMsgAll: 'All records of {url} will be deleted!',
            deleteConfirmMsgRange: 'All records of {url} between {start} and {end} will be deleted!',
            deleteConfirmMsg: 'The record of {url} on {date} will be deleted!',
            exportWholeData: 'Export Data',
            importWholeData: 'Import Data',
        },
    },
    ja: {
        date: '日期',
        host: 'URL',
        focus: '閲覧時間',
        time: '拜訪回数',
        operation: {
            label: '操作',
            delete: '削除',
            add2Whitelist: 'ホワイトリスト',
            removeFromWhitelist: '有効にする',
            jumpToTrend: '傾向',
            deleteConfirmMsgAll: '{url} のすべての拜訪記録が削除されます',
            deleteConfirmMsgRange: '{url} {start} から {end} までの拜訪記録は削除されます',
            deleteConfirmMsg: '{date} の {url} の拜訪記録は削除されます',
            exportWholeData: 'インポート',
            importWholeData: '書き出す',
        },
    },
}

export default _default
