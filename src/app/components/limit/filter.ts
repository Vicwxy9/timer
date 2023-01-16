/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Operation, Plus } from "@element-plus/icons-vue"
import { Ref, h, defineComponent, ref } from "vue"
import InputFilterItem from "@app/components/common/input-filter-item"
import SwitchFilterItem from "@app/components/common/switch-filter-item"
import ButtonFilterItem from "@app/components/common/button-filter-item"
import { t } from "@app/locale"

const urlPlaceholder = t(msg => msg.limit.conditionFilter)
const onlyEnabledLabel = t(msg => msg.limit.filterDisabled)
const addButtonText = t(msg => msg.limit.button.add)
const testButtonText = t(msg => msg.limit.button.test)

const emits = {
    create: () => true,
    change: (_option: LimitFilterOption) => true,
    test: () => true,
}

const _default = defineComponent({
    name: "LimitFilter",
    props: {
        url: String,
        onlyEnabled: Boolean
    },
    emits,
    setup(props, ctx) {
        const url: Ref<string> = ref(props.url)
        const onlyEnabled: Ref<boolean> = ref(props.onlyEnabled)
        const handleChange = () => ctx.emit("change", {
            url: url.value,
            onlyEnabled: onlyEnabled.value
        })
        return () => [
            h(InputFilterItem, {
                placeholder: urlPlaceholder,
                onSearch(searchVal: string) {
                    url.value = searchVal
                    handleChange()
                },
            }),
            h(SwitchFilterItem, {
                historyName: 'onlyEnabled',
                label: onlyEnabledLabel,
                defaultValue: onlyEnabled.value,
                onChange(newVal: boolean) {
                    onlyEnabled.value = newVal
                    handleChange()
                }
            }),
            h(ButtonFilterItem, {
                text: testButtonText,
                type: 'primary',
                icon: Operation,
                onClick: () => ctx.emit('test')
            }),
            h(ButtonFilterItem, {
                text: addButtonText,
                type: "success",
                icon: Plus,
                onClick: () => ctx.emit("create")
            })
        ]
    }
})

export default _default