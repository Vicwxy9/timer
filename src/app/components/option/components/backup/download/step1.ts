/**
 * Copyright (c) 2023 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { t } from "@app/locale"
import { Close, Right } from "@element-plus/icons-vue"
import { fillExist } from "@service/components/import-processor"
import optionService from "@service/option-service"
import processor from "@src/common/backup/processor"
import { RELEASE_DATE, parseTime } from "@util/time"
import { ElButton, ElMessage } from "element-plus"
import { defineComponent, Ref, h, ref } from "vue"
import ClientTable from "../client-table"

async function fetchData(client: timer.backup.Client): Promise<timer.imported.Data> {
    const { id: specCid, maxDate, minDate = RELEASE_DATE } = client
    const start = parseTime(minDate)
    const end = maxDate ? parseTime(maxDate) : new Date()
    const option: timer.option.BackupOption = await optionService.getAllOption()
    const { backupType: type, backupAuths } = option || {}
    const auth = backupAuths?.[type]
    const remoteRows: timer.stat.Row[] = await processor.query(type, auth, { specCid, start, end })
    const rows: timer.imported.Row[] = (remoteRows || []).map(rr => ({
        date: rr.date,
        host: rr.host,
        focus: rr.focus,
        time: rr.time
    }))
    await fillExist(rows)
    return { rows, focus: true, time: true }
}

const _default = defineComponent({
    emits: {
        cancel: () => true,
        next: (_data: timer.imported.Data, _client: timer.backup.Client) => true
    },
    setup(_, ctx) {
        const client: Ref<timer.backup.Client> = ref()
        const loading: Ref<boolean> = ref()

        const handleNext = () => {
            const clientVal = client.value
            if (!clientVal) {
                ElMessage.warning(t(msg => msg.option.backup.clientTable.notSelected))
                return
            }
            loading.value = true
            fetchData(clientVal)
                .then(data => ctx.emit('next', data, clientVal))
                .catch((e: Error) => {
                    ElMessage.error(e.message || 'Unknown error...')
                    console.error(e)
                })
                .finally(() => loading.value = false)
        }

        return () => [
            h(ClientTable, {
                onSelect: newVal => client.value = newVal,
            }),
            h('div', { class: 'sop-footer' }, [
                h(ElButton, {
                    type: 'info',
                    icon: Close,
                    onClick: () => ctx.emit('cancel'),
                }, () => t(msg => msg.button.cancel)),
                h(ElButton, {
                    type: 'primary',
                    icon: Right,
                    loading: loading.value,
                    onClick: handleNext
                }, () => t(msg => msg.button.next)),
            ])
        ]
    }
})

export default _default