/**
 * Copyright (c) 2021 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ElTableColumn } from "element-plus"
import { defineComponent } from "vue"
import { t } from "@app/locale"
import HostAlert from "@app/components/common/HostAlert"
import { isRemainHost } from "@util/constant/remain-host"
import { ElTableRowScope } from "@src/element-ui/table"
import { useReportFilter } from "../../context"
import HostMergedAlert from "../../common/HostMergedAlert"

const columnLabel = t(msg => msg.item.host)

const _default = defineComponent(() => {
    const filter = useReportFilter()
    return () => (
        <ElTableColumn prop="host" label={columnLabel} minWidth={210} sortable="custom" align="center">
            {
                ({ row }: ElTableRowScope<timer.stat.Row>) => filter.value?.mergeHost
                    ? <HostMergedAlert mergedHost={row.host}>
                        {row.mergedHosts.map(({ host, iconUrl }) =>
                            <p>
                                <HostAlert host={host} iconUrl={iconUrl} clickable={!isRemainHost(host)} />
                            </p>
                        )}
                    </HostMergedAlert>
                    : <HostAlert {...row} clickable={!isRemainHost(row.host)} />
            }
        </ElTableColumn>
    )
})

export default _default