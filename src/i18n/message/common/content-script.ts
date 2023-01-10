/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export type ContentScriptMessage = {
    consoleLog: string
    closeAlert: string
    timeWithHour: string
    timeWithMinute: string
    timeWithSecond: string
    timeLimitMsg: string
    more5Minutes: string
}

const _default: Messages<ContentScriptMessage> = {
    zh_CN: {
        consoleLog: '今天您打开了 {time} 次 {host}，花费了 {focus} 来浏览它。',
        closeAlert: '你可以在【网费很贵】的选项中关闭以上提示！',
        timeWithHour: '{hour} 小时 {minute} 分 {second} 秒',
        timeWithMinute: '{minute} 分 {second} 秒',
        timeWithSecond: '{second} 秒',
        timeLimitMsg: '您已被【{appName}】限制上网',
        more5Minutes: '再看 5 分钟！！我保证！',
    },
    zh_TW: {
        consoleLog: '今天您打開了 {time} 次 {host}，花費了 {focus} 來瀏覽它。',
        closeAlert: '你可以在【網費很貴】的選項中關閉以上提示！',
        timeWithHour: '{hour} 小時 {minute} 分 {second} 秒',
        timeWithMinute: '{minute} 分 {second} 秒',
        timeWithSecond: '{second} 秒',
        timeLimitMsg: '您已被【{appName}】限製上網',
        more5Minutes: '再看 5 分鐘！！我保証！',
    },
    en: {
        consoleLog: 'You have open {host} for {time} time(s) and browsed it for {focus} today.',
        closeAlert: 'You can turn off the above tips in the option of Timer!',
        timeWithHour: '{hour} hour(s) {minute} minute(s) {second} second(s)',
        timeWithMinute: '{minute} minute(s) {second} second(s)',
        timeWithSecond: '{second} second(s)',
        timeLimitMsg: 'You have been restricted by [{appName}]',
        more5Minutes: 'More 5 minutes, please!!',
    },
    ja: {
        consoleLog: '{host} を {time} 回開いて、今日 {focus} をブラウズしました。',
        closeAlert: 'Timer のオプションで上記のヒントをオフにすることができます！',
        timeWithHour: '{hour} 時間 {minute} 分 {second} 秒',
        timeWithMinute: '{minute} 分 {second} 秒',
        timeWithSecond: '{second} 秒',
        timeLimitMsg: '【{appName}】によって制限されています',
        more5Minutes: 'さらに5分間見てください！ ！ 約束します！',
    },
}

export default _default