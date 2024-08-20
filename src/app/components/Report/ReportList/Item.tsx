import { Effect, ElDescriptions, ElDescriptionsItem, ElDivider, ElIcon, ElLink, ElTag, ElTooltip } from "element-plus"
import { computed, defineComponent, PropType } from "vue"
import { useReportFilter } from "../context"
import HostMergedAlert from "../common/HostMergedAlert"
import HostAlert from "@app/components/common/HostAlert"
import { t } from "@app/locale"
import { cvt2LocaleTime, periodFormatter } from "@app/util/time"
import CompositionTable from "../common/CompositionTable"
import { Calendar, Delete, Mouse, QuartzWatch } from "@element-plus/icons-vue"
import TooltipWrapper from "@app/components/common/TooltipWrapper"

const FocusTag = defineComponent({
    props: {
        value: Number,
    },
    setup(props) {
        const filter = useReportFilter()
        return () => (
            <ElTag type="primary">
                {t(msg => msg.item.focus)}: {periodFormatter(props.value, { format: filter.value?.timeFormat })}
            </ElTag>
        )
    }
})

const _default = defineComponent({
    props: {
        value: Object as PropType<timer.stat.Row>,
    },
    setup(props, ctx) {
        const filter = useReportFilter()
        const mergeHost = computed(() => !!filter.value?.mergeHost)
        const formatter = (focus: number): string => periodFormatter(focus, { format: filter.value?.timeFormat })
        const { iconUrl, host, mergedHosts, date, focus, composition, time } = props.value || {}
        return () => <>
            <div class="report-item">
                <div class="report-item-title">
                    <div>
                        <TooltipWrapper
                            placement="bottom"
                            effect={Effect.LIGHT}
                            offset={10}
                            trigger="click"
                            showPopover={mergeHost.value}
                            v-slots={{
                                content: () => mergedHosts?.map(({ host, iconUrl }) => (
                                    <p>
                                        <HostAlert host={host} iconUrl={iconUrl} clickable={false} />
                                    </p>
                                )),
                            }}
                        >
                            <HostAlert
                                host={host}
                                iconUrl={mergeHost.value ? null : iconUrl}
                                clickable={false}
                            />
                        </TooltipWrapper>
                    </div>
                    <ElLink
                        type="danger"
                        icon={<Delete />}
                        onClick={() => console.log()}
                    />
                </div>
                <ElDivider style={{ margin: "5px 0" }} />
                <div class="report-item-content">
                    <ElTag v-show={!filter.value?.mergeDate} type="info" size="small">
                        <ElIcon><Calendar /></ElIcon>
                        <span>{cvt2LocaleTime(date)}</span>
                    </ElTag>
                    <TooltipWrapper
                        placement="top"
                        effect={Effect.LIGHT}
                        offset={10}
                        trigger="click"
                        v-slots={{
                            content: () => <CompositionTable valueFormatter={formatter} data={composition?.focus || []} />,
                        }}
                    >
                        <ElTag type="primary" size="small">
                            <ElIcon><QuartzWatch /></ElIcon>
                            <span>{periodFormatter(focus, { format: filter.value?.timeFormat })}</span>
                        </ElTag>
                    </TooltipWrapper>
                    <TooltipWrapper
                        placement="top"
                        effect={Effect.LIGHT}
                        offset={10}
                        trigger="click"
                        v-slots={{
                            content: () => <CompositionTable data={composition?.time || []} />,
                        }}
                    >
                        <ElTag type="warning" size="small">
                            <ElIcon><Mouse /></ElIcon>
                            <span>{time ?? 0}</span>
                        </ElTag>
                    </TooltipWrapper>
                </div>
            </div>
        </>
    },
})

export default _default