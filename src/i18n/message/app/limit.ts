/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import resource from './limit-resource.json'

export type LimitMessage = {
    conditionFilter: string
    filterDisabled: string
    addTitle: string
    useWildcard: string
    urlPlaceholder: string
    step1: string
    step2: string
    item: {
        condition: string
        time: string
        visitTime: string
        period: string
        enabled: string
        delayAllowed: string
        delayAllowedInfo: string
        waste: string
        operation: string
    }
    button: {
        test: string
        option: string
    }
    message: {
        noUrl: string
        noRule: string
        saved: string
        deleteConfirm: string
        deleted: string
        noPermissionFirefox: string
        inputTestUrl: string
        clickTestButton: string
        noRuleMatched: string
        rulesMatched: string
    }
    verification: {
        inputTip: string
        inputTip2: string
        pswInputTip: string
        incorrectPsw: string
        incorrectAnswer: string
        pi: string
        confession: string
    }
}

const _default: Messages<LimitMessage> = resource

export default _default