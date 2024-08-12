import { hasDailyLimited, hasWeeklyLimited, matches } from "@util/limit"
import { LimitReason, ModalContext, Processor } from "../common"
import { sendMsg2Runtime } from "@api/chrome/runtime"

const cvtItem2AddReason = (item: timer.limit.Item): LimitReason[] => {
    const { cond, allowDelay, id, delayCount, weeklyDelayCount } = item
    const reasons2Add: LimitReason[] = []
    hasDailyLimited(item) && reasons2Add.push({ type: "DAILY", cond, allowDelay, id, delayCount })
    hasWeeklyLimited(item) && reasons2Add.push({ type: 'WEEKLY', cond, allowDelay, id, delayCount: weeklyDelayCount })
    return reasons2Add
}

const cvtItem2RemoveReason = (item: timer.limit.Item): LimitReason[] => {
    const { cond, allowDelay, id, delayCount, weeklyDelayCount } = item
    const reasons2Remove: LimitReason[] = []
    !hasDailyLimited(item) && reasons2Remove.push({ type: 'DAILY', cond, allowDelay, id, delayCount })
    !hasWeeklyLimited(item) && reasons2Remove.push({ type: 'WEEKLY', cond, allowDelay, id, delayCount: weeklyDelayCount })
    return reasons2Remove
}

class MessageAdaptor implements Processor {
    private context: ModalContext

    constructor(context: ModalContext) {
        this.context = context
    }

    handleMsg(code: timer.mq.ReqCode, data: unknown): timer.mq.Response | Promise<timer.mq.Response> {
        let items = data as timer.limit.Item[]
        if (code === "limitTimeMeet") {
            if (!items?.length) {
                return { code: "fail" }
            }
            items.filter(item => matches(item?.cond, this.context.url))
                .flatMap(cvtItem2AddReason)
                .forEach(reason => reason && this.context.modal.addReason(reason))
            return { code: "success" }
        } else if (code === "limitChanged") {
            this.context.modal.removeReasonsByType("DAILY", "WEEKLY")
            items?.flatMap(cvtItem2AddReason)
                ?.forEach(reason => reason && this.context.modal.addReason(reason))
            return { code: "success" }
        } else if (code === "limitWaking") {
            const reasons2Remove = items?.flatMap(cvtItem2RemoveReason)
            reasons2Remove?.length && this.context.modal.removeReason(...reasons2Remove)
            return { code: "success" }
        }
        return { code: "ignore" }
    }

    async init(): Promise<void> {
        this.initRules?.()
        this.context.modal?.addDelayHandler(() => this.initRules())
    }

    async initRules(): Promise<void> {
        this.context.modal?.removeReasonsByType?.('DAILY', 'WEEKLY')
        const limitedRules: timer.limit.Item[] = await sendMsg2Runtime('cs.getLimitedRules', this.context.url)

        limitedRules
            ?.flatMap?.(cvtItem2AddReason)
            ?.forEach(reason => this.context.modal.addReason(reason))
    }
}

export default MessageAdaptor