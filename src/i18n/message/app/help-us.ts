/**
 * Copyright (c) 2022 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

type _AlertLine =
    | 'l1'
    | 'l2'
    | 'l3'
    | 'l4'

export type HelpUsMessage = {
    title: string
    alert: { [line in _AlertLine]: string }
    button: string
    loading: string
}

const _default: Messages<HelpUsMessage> = {
    zh_CN: {
        title: '欢迎一起来改善本地化翻译！',
        alert: {
            l1: '由于作者的语言能力，该扩展原生只支持简体中文和英语，其他语言要么缺失，要么就严重依赖机器翻译。',
            l2: '为了能够提供更好的用户体验，我将其他语言的翻译任务托管在了 Crowdin 上。Crowdin 是一个对开源软件免费的翻译管理系统。',
            l3: '如果您觉得这个扩展对您有用，并且您愿意完善它的文本翻译的话，可以点击下方按钮前往 Crowdin 上的项目主页。',
            l4: '当某种语言的翻译进度达到 80% 之后，我将会考虑在扩展中支持它。',
        },
        button: '前往 Crowdin',
        loading: '正在查询翻译进度...',
    },
    en: {
        title: 'Feel free to help improve the extension\'s localization translations!',
        alert: {
            l1: 'Due to the author\'s language ability, \
                the extension only supports Simplified Chinese and English natively, \
                and other languages are either missing or rely heavily on machine translation.',
            l2: 'In order to provide a better user experience, \
                I host the translation tasks for other languages on Crowdin. \
                Crowdin is a translation management system free for open source software.',
            l3: 'If you find this extension useful to you and you are willing to improve its translation, \
                you can click the button below to go to the project home page on Crowdin.',
            l4: 'When the translation progress of a language reaches 80%, I will consider supporting it in this extension.',
        },
        button: 'Go Crowdin',
        loading: 'Checking translation progress...',
    },
    ja: {
        title: 'Feel free to help improve the extension\'s localization translations!',
        alert: {
            l1: 'Due to the author\'s language ability, \
                the extension only supports Simplified Chinese and English natively, \
                and other languages are either missing or rely heavily on machine translation.',
            l2: 'In order to provide a better user experience, \
                I host the translation tasks for other languages on Crowdin. \
                Crowdin is a translation management system free for open source software.',
            l3: 'If you find this extension useful to you and you are willing to improve its translation, \
                you can click the button below to go to the project home page on Crowdin.',
            l4: 'When the translation progress of a language reaches 80%, I will consider supporting it in this extension.',
        },
        button: 'Go Crowdin',
        loading: 'Checking translation progress...',
    },
    zh_TW: {
        title: 'Feel free to help improve the extension\'s localization translations!',
        alert: {
            l1: 'Due to the author\'s language ability, \
                the extension only supports Simplified Chinese and English natively, \
                and other languages are either missing or rely heavily on machine translation.',
            l2: 'In order to provide a better user experience, \
                I host the translation tasks for other languages on Crowdin. \
                Crowdin is a translation management system free for open source software.',
            l3: 'If you find this extension useful to you and you are willing to improve its translation, \
                you can click the button below to go to the project home page on Crowdin.',
            l4: 'When the translation progress of a language reaches 80%, I will consider supporting it in this extension.',
        },
        button: 'Go Crowdin',
        loading: 'Checking translation progress...',
    },
}

export default _default