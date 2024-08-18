import { ElCard } from "element-plus"
import { defineComponent, PropType } from "vue"
import { useReportFilter } from "../context"
import HostMergedAlert from "../common/HostMergedAlert"
import HostAlert from "@app/components/common/HostAlert"

const _default = defineComponent({
    props: {
        value: Object as PropType<timer.stat.Row>,
    },
    setup(props, ctx) {
        const filter = useReportFilter()
        const { iconUrl, host, mergedHosts } = props.value || {}
        return () => (
            <ElCard>
                <div>
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
                </div>
            </ElCard>
        )
    },
})

export default _default