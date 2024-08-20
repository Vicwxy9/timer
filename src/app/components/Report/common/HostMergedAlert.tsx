import { Effect, ElTooltip } from "element-plus"
import { defineComponent, h, PropType } from "vue"

/**
 * Merged host column
 *
 * @since 0.7.0
 */
const default_ = defineComponent({
    props: {
        mergedHost: {
            type: String,
            required: true
        },
        trigger: String as PropType<"click" | "hover">,
    },
    setup(props, ctx) {
        return () => (
            <ElTooltip
                placement="left"
                effect={Effect.LIGHT}
                offset={10}
                trigger={props.trigger}
                v-slots={{ content: () => h(ctx.slots.default) }}
            >
                <a class="el-link el-link--default is-underline">
                    <span class="el-link--inner">{props.mergedHost}</span>
                </a>
            </ElTooltip>
        )
    }
})

export default default_