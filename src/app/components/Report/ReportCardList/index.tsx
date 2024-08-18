import { defineComponent, PropType } from "vue"
import Item from "./Item"
import "./style"

const _default = defineComponent({
    props: {
        data: Array as PropType<timer.stat.Row[]>,
        end: Boolean,
    },
    setup(props, ctx) {

        return () => (
            <div class="report-card-list">
                {props.data?.map(row => (
                    <Item value={row} />
                ))}
            </div>
        )
    },
})

export default _default