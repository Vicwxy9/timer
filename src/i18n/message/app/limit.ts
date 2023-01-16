/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export type LimitMessage = {
    conditionFilter: string
    filterDisabled: string
    addTitle: string
    useWildcard: string
    urlPlaceholder: string
    item: {
        condition: string
        time: string
        enabled: string
        delayAllowed: string
        delayAllowedInfo: string
        waste: string
        operation: string
    }
    button: {
        add: string
        test: string
        testSimple: string
        paste: string
        save: string
        delete: string
        modify: string
    }
    message: {
        noUrl: string
        noTime: string
        saved: string
        deleteConfirm: string
        deleted: string
        noPermissionFirefox: string
        inputTestUrl: string
        clickTestButton: string
        noRuleMatched: string
        rulesMatched: string
    }
    testUrlLabel: string
}

const _default: Messages<LimitMessage> = {
    zh_CN: {
        conditionFilter: '输入网址，然后回车',
        filterDisabled: '过滤无效规则',
        item: {
            condition: '限制网址',
            time: '每日限制时长',
            waste: '今日浏览时长',
            enabled: '是否有效',
            delayAllowed: '再看 5 分钟',
            delayAllowedInfo: '上网时间超过限制时，点击【再看 5 分钟】短暂延时。如果关闭该功能则不能延时。',
            operation: '操作',
        },
        button: {
            add: '新增',
            test: '网址测试',
            testSimple: '测试',
            paste: '粘贴',
            save: '保存',
            delete: '删除',
            modify: '修改',
        },
        addTitle: '新增限制',
        useWildcard: '是否使用通配符',
        message: {
            saved: '保存成功',
            noUrl: '未填写限制网址',
            noTime: '未填写每日限制时长',
            deleteConfirm: '是否删除限制：{cond}？',
            deleted: '删除成功',
            noPermissionFirefox: '请先在插件管理页[about:addons]开启该插件的粘贴板权限',
            inputTestUrl: '请先输入需要测试的网址链接',
            clickTestButton: '输入完成后请点击【{buttonText}】按钮',
            noRuleMatched: '该网址未命中任何规则',
            rulesMatched: '该网址命中以下规则：',
        },
        testUrlLabel: '测试网址',
        urlPlaceholder: '请直接粘贴网址 ➡️',
    },
    zh_TW: {
        conditionFilter: '輸入網址，然後回車',
        filterDisabled: '過濾無效規則',
        item: {
            condition: '限製網址',
            time: '每日限製時長',
            waste: '今日瀏覽時長',
            enabled: '是否有效',
            delayAllowed: '再看 5 分鐘',
            delayAllowedInfo: '上網時間超過限製時，點擊【再看 5 分鐘】短暫延時。如果關閉該功能則不能延時。',
            operation: '操作',
        },
        button: {
            add: '新增',
            test: '網址測試',
            testSimple: '測試',
            paste: '粘貼',
            save: '保存',
            delete: '刪除',
            modify: '修改',
        },
        addTitle: '新增限製',
        useWildcard: '是否使用通配符',
        message: {
            saved: '保存成功',
            noUrl: '未填冩限製網址',
            noTime: '未填冩每日限製時長',
            deleteConfirm: '是否刪除限製：{cond}？',
            deleted: '刪除成功',
            noPermissionFirefox: '請先在插件管理頁[about:addons]開啟該插件的粘貼闆權限',
            inputTestUrl: '請先輸入需要測試的網址鏈接',
            clickTestButton: '輸入完成後請點擊【{buttonText}】按鈕',
            noRuleMatched: '該網址未命中任何規則',
            rulesMatched: '該網址命中以下規則：',
        },
        urlPlaceholder: '請直接粘貼網址 ➡️',
        testUrlLabel: '測試網址',
    },
    en: {
        conditionFilter: 'URL',
        filterDisabled: 'Only enabled',
        item: {
            condition: 'Restricted URL',
            time: 'Daily time limit',
            waste: 'Browsed today',
            enabled: 'Enabled',
            delayAllowed: 'More 5 minutes',
            delayAllowedInfo: 'If it times out, allow a temporary delay of 5 minutes',
            operation: 'Operations',
        },
        button: {
            add: 'New',
            test: 'Test URL',
            testSimple: 'Test',
            paste: 'Paste',
            save: 'Save',
            delete: 'Delete',
            modify: 'Modify',
        },
        addTitle: 'New',
        useWildcard: 'Whether to use wildcard',
        message: {
            saved: 'Saved successfully',
            noUrl: 'Unfilled limited URL',
            noTime: 'Unfilled limited time per day',
            deleteConfirm: 'Do you want to delete the rule of {cond}?',
            deleted: 'Deleted successfully',
            noPermissionFirefox: 'Please enable the clipboard permission of this addon on the management page (about:addons) first',
            inputTestUrl: 'Please enter the URL link to be tested first',
            clickTestButton: 'After inputting, please click the button ({buttonText})',
            noRuleMatched: 'The URL does not hit any rules',
            rulesMatched: 'The URL hits the following rules:',
        },
        urlPlaceholder: 'Please paste the URL directly ➡️',
        testUrlLabel: 'Test URL',
    },
    ja: {
        conditionFilter: 'URL',
        filterDisabled: '有效',
        item: {
            condition: '制限 URL',
            waste: '今日の時間を閲覧する',
            time: '1日あたりの制限',
            enabled: '有效',
            delayAllowed: 'さらに5分間閲覧する',
            delayAllowedInfo: '時間が経過した場合は、一時的に5分遅らせることができます',
            operation: '操作',
        },
        button: {
            add: '新增',
            test: 'テストURL',
            testSimple: 'テスト',
            paste: 'ペースト',
            save: 'セーブ',
            delete: '削除',
            modify: '変更',
        },
        addTitle: '新增',
        useWildcard: 'ワイルドカードを使用するかどうか',
        message: {
            noUrl: '埋められていない制限URL',
            noTime: '1日の制限時間を記入しない',
            saved: '正常に保存',
            deleteConfirm: '{cond} の制限を削除しますか？',
            deleted: '正常に削除',
            noPermissionFirefox: '最初にプラグイン管理ページでプラグインのペーストボード権限を有効にしてください',
            inputTestUrl: '最初にテストする URL リンクを入力してください',
            clickTestButton: '入力後、ボタン({buttonText})をクリックしてください',
            noRuleMatched: 'URL がどのルールとも一致しません',
            rulesMatched: 'URL は次のルールに一致します。',
        },
        urlPlaceholder: 'URLを直接貼り付けてください➡️',
        testUrlLabel: 'テスト URL',
    },
}

export default _default