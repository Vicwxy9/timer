/**
 * Copyright (c) 2022 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import type { Ref } from "vue"

import { t } from "@app/locale"
import { Edit } from "@element-plus/icons-vue"
import { tryParseInteger } from "@util/number"
import { ElTag, TagProps } from "element-plus"
import { computed, defineComponent, h, ref } from "vue"
import ItemInput from "./ItemInput"
import { computeMergeTxt, computeMergeType } from "@util/merge"
import { useShadow } from "@app/hooks/useShadow"

export type ItemInstance = {
    forceEdit(): void
}

const _default = defineComponent({
    props: {
        origin: String,
        merged: [String, Number],
        index: Number
    },
    emits: {
        change: (_origin: string, _merged: string | number, _idx: number) => true,
        delete: (_origin: string) => true,
    },
    setup(props, ctx) {
        const origin = useShadow(() => props.origin)
        const merged = useShadow(() => props.merged, '')
        const id = useShadow(() => props.index, 0)
        const editing: Ref<boolean> = ref(false)
        const type: Ref<TagProps["type"]> = computed(() => computeMergeType(merged.value))
        const tagTxt: Ref<string> = computed(() => computeMergeTxt(origin.value, merged.value,
            (finder, param) => t(msg => finder(msg.mergeCommon), param)
        ))
        const instance: ItemInstance = {
            forceEdit: () => editing.value = true
        }
        ctx.expose(instance)
        const handleSave = (newOrigin: string, newMerged: string) => {
            origin.value = newOrigin
            const newMergedVal = tryParseInteger(newMerged?.trim())[1]
            merged.value = newMergedVal
            editing.value = false
            ctx.emit("change", newOrigin, newMergedVal, id.value)
        }
        const handleCancel = () => {
            origin.value = props.origin
            merged.value = props.merged
            editing.value = false
        }

        return () => editing.value
            ? <ItemInput
                origin={origin.value}
                merged={merged.value}
                onSave={handleSave}
                onCancel={handleCancel}
            />
            : <ElTag
                class="editable-item"
                type={type.value}
                closable
                onClose={() => ctx.emit("delete", props.origin)}
            >
                {tagTxt.value}
                {h(Edit, { class: "edit-icon", onclick: () => editing.value = true })}
            </ElTag>
    }
})

export default _default