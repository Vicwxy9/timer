import { defineComponent } from "vue"
import Item from "./Item"
import "./style"
import { ElCard } from "element-plus"
import { t } from "@app/locale"
import { useState } from "@hooks/useState"
import { DisplayComponent, useReportFilter } from "../context"
import { useScrollRequest } from "@hooks/useScrollRequest"
import { cvtOption2Param } from "../ReportFilter/common"
import statService from "@service/stat-service"

const _default = defineComponent({
    setup(_, ctx) {
        const filterOption = useReportFilter()

        const { data, loading, loadMoreAsync, end } = useScrollRequest(async (num, size) => {
            const param = cvtOption2Param(filterOption.value)
            const pagination = await statService.selectByPage(param, { num, size })
            return pagination.list
        })

        const [selected, setSelected] = useState<timer.stat.Row[]>([])

        ctx.expose({
            getSelected: () => selected.value,
            refresh: () => { },
        } satisfies DisplayComponent)

        return () => <>
            <div class="report-list-wrapper">
                <div
                    class="report-list"
                    v-infinite-scroll={loadMoreAsync}
                    infinite-scroll-disabled={end.value || loading.value}
                >
                    {data.value?.map(row => (
                        <ElCard>
                            <Item value={row} />
                        </ElCard>
                    ))}
                </div>
                <p class="scroll-info" v-loading={loading.value}>
                    {end.value ? t(msg => msg.report.noMore) : (loading.value ? 'Loading ...' : 'Load More')}
                </p>
            </div>
        </>
    },
})

export default _default