import { defineComponent, PropType } from "vue"
import Item from "./Item"
import "./style"
import { ElCard } from "element-plus"

const _default = defineComponent({
    props: {
        data: Array as PropType<timer.stat.Row[]>,
        end: Boolean,
    },
    setup(props, ctx) {

        return () => (
            <div class="report-list">
                {props.data?.map(row => (
                    <ElCard>
                        <Item value={row} />
                    </ElCard>
                ))}
            </div>
        )
    },
})

export default _default