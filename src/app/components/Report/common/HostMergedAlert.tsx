import { Effect, ElTooltip } from "element-plus"
import { defineComponent, h } from "vue"

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
        }
    },
    setup(props, ctx) {
        return () => (
            <ElTooltip
                placement="left"
                effect={Effect.LIGHT}
                offset={10}
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