import { Effect, ElButton, ElDescriptions, ElDescriptionsItem, ElLink, ElTooltip } from "element-plus"
import { defineComponent, PropType } from "vue"
import { useReportFilter } from "../context"
import HostMergedAlert from "../common/HostMergedAlert"
import HostAlert from "@app/components/common/HostAlert"
import { t } from "@app/locale"
import { cvt2LocaleTime, periodFormatter } from "@app/util/time"
import CompositionTable from "../common/CompositionTable"
import { Delete } from "@element-plus/icons-vue"

const _default = defineComponent({
    props: {
        value: Object as PropType<timer.stat.Row>,
    },
    setup(props, ctx) {
        const filter = useReportFilter()
        const formatter = (focus: number): string => periodFormatter(focus, { format: filter.value?.timeFormat })
        const { iconUrl, host, mergedHosts, date, focus, composition, time } = props.value || {}
        return () => <>
            <ElDescriptions
                size="small"
                border
                column={1}
                v-slots={{
                    title: () => (
                        <div>
                            {filter.value?.mergeHost
                                ? <HostMergedAlert mergedHost={host}>
                                    {mergedHosts?.map(({ host, iconUrl }) =>
                                        <p>
                                            <HostAlert host={host} iconUrl={iconUrl} clickable={false} />
                                        </p>
                                    )}
                                </HostMergedAlert>
                                : <HostAlert host={host} iconUrl={iconUrl} clickable={false} />
                            }
                        </div>
                    ),
                    extra: () => <ElLink
                        type="danger"
                        icon={<Delete />}
                        onClick={() => console.log()}
                    />,
                    default: () => <>
                        <ElDescriptionsItem
                            v-show={!filter.value?.mergeDate}
                            label={t(msg => msg.item.date)}
                        >
                            {cvt2LocaleTime(date)}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label={t(msg => msg.item.focus)}>
                            {filter.value?.readRemote
                                ? <ElTooltip
                                    placement="top"
                                    effect={Effect.LIGHT}
                                    offset={10}
                                    v-slots={{
                                        content: () => <CompositionTable valueFormatter={formatter} data={composition?.focus || []} />
                                    }}
                                >
                                    {formatter(focus)}
                                </ElTooltip>
                                : formatter(focus)
                            }
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label={t(msg => msg.item.time)} span={24}>
                            {filter.value?.readRemote
                                ? <ElTooltip
                                    placement="top"
                                    effect={Effect.LIGHT}
                                    offset={10}
                                    v-slots={{
                                        content: () => <CompositionTable
                                            valueFormatter={v => v?.toString?.() || "0"}
                                            data={composition?.time || []}
                                        />
                                    }}
                                >
                                    {time}
                                </ElTooltip>
                                : time
                            }
                        </ElDescriptionsItem>
                    </>
                }}>

            </ElDescriptions>
        </>
    },
})

export default _default