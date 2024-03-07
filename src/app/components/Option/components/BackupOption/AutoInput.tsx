/**
 * Copyright (c) 2023 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { t } from "@app/locale"
import { ElInputNumber, ElSwitch } from "element-plus"
import { defineComponent, ref, watch } from "vue"
import localeMessages from "@i18n/message/common/locale"
import { locale } from "@i18n"
import I18nNode from "@app/components/common/I18nNode"

const _default = defineComponent({
    props: {
        autoBackup: Boolean,
        interval: Number
    },
    emits: {
        change: (_autoBackUp: boolean, _interval: number) => true
    },
    setup(props, ctx) {
        const autoBackUp = ref(props.autoBackup)
        const interval = ref(props.interval)
        watch(() => props.autoBackup, newVal => autoBackUp.value = newVal)
        watch(() => props.interval, newVal => interval.value = newVal)

        watch([autoBackUp, interval], () => ctx.emit('change', autoBackUp.value, interval.value))

        return () => <>
            <ElSwitch
                modelValue={autoBackUp.value}
                onChange={(val: boolean) => autoBackUp.value = val}
            />
            {' ' + t(msg => msg.option.backup.auto.label)}
            <div v-show={autoBackUp.value}>
                {localeMessages[locale].comma || ' '}
                <I18nNode
                    path={msg => msg.option.backup.auto.interval}
                    param={{
                        input: <ElInputNumber
                            min={10}
                            size="small"
                            modelValue={interval.value}
                            onChange={val => interval.value = val}
                        />
                    }}
                />
            </div>
            <span v-show={autoBackUp.value}>{localeMessages[locale].comma || ' '}</span>
        </>
    },
})

export default _default