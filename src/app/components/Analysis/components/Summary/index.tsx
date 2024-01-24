/**
 * Copyright (c) 2023 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import type { Ref } from "vue"

import { computed, defineComponent } from "vue"
import Site from "./Site"
import { KanbanIndicatorCell, KanbanCard, KanbanIndicatorRow } from "@app/components/common/kanban"
import "./summary.sass"
import { ElCol } from "element-plus"
import { t } from "@app/locale"
import { cvt2LocaleTime, periodFormatter } from "@app/util/time"
import { useAnalysisRows, useAnalysisSite, useAnalysisTimeFormat } from "../../context"

type Summary = {
    focus: number
    visit: number
    day: number
    firstDay?: string
}

function computeSummary(site: timer.site.SiteKey, rows: timer.stat.Row[]): Summary {
    if (!site) return undefined

    const summary: Summary = { focus: 0, visit: 0, day: 0 }
    summary.firstDay = rows?.[0]?.date
    rows?.forEach(({ focus, time: visit }) => {
        summary.focus += focus
        summary.visit += visit
        focus && (summary.day += 1)
    })
    return summary
}

const DAYS_LABEL = t(msg => msg.analysis.summary.day)
const FOCUS_LABEL = t(msg => msg.analysis.common.focusTotal)
const VISIT_LABEL = t(msg => msg.analysis.common.visitTotal)

const _default = defineComponent(() => {
    const site = useAnalysisSite()
    const timeFormat = useAnalysisTimeFormat()
    const rows = useAnalysisRows()

    const summary: Ref<Summary> = computed(() => computeSummary(site.value, rows.value))

    return () => (
        <KanbanCard title={t(msg => msg.analysis.summary.title)}>
            <KanbanIndicatorRow>
                <ElCol span={6}>
                    <Site />
                </ElCol>
                <ElCol span={6}>
                    <KanbanIndicatorCell
                        mainName={DAYS_LABEL}
                        mainValue={summary.value?.day?.toString?.() || '-'}
                        subTips={msg => msg.analysis.summary.firstDay}
                        subValue={summary.value?.firstDay ? `@${cvt2LocaleTime(summary.value?.firstDay)}` : ''}
                    />
                </ElCol>
                <ElCol span={6}>
                    <KanbanIndicatorCell
                        mainName={FOCUS_LABEL}
                        mainValue={summary.value?.focus === undefined ? '-' : periodFormatter(summary.value?.focus, timeFormat.value, false)}
                    />
                </ElCol>
                <ElCol span={6}>
                    <KanbanIndicatorCell mainName={VISIT_LABEL} mainValue={summary.value?.visit?.toString?.() || '-'} />
                </ElCol>
            </KanbanIndicatorRow>
        </KanbanCard>
    )
})

export default _default