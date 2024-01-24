/**
 * Copyright (c) 2021 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ElPagination } from "element-plus"
import { PropType, defineComponent } from "vue"

const _default = defineComponent({
    props: {
        defaultValue: Object as PropType<[number, number]>,
        total: Number
    },
    emits: {
        change: (_currentPage: number, _pageSize: number) => true,
    },
    setup(props, ctx) {
        return () => (
            <div class="pagination-container">
                <ElPagination
                    pageSizes={[10, 20, 50]}
                    defaultCurrentPage={props.defaultValue?.[0]}
                    defaultPageSize={props.defaultValue?.[1]}
                    layout="total, sizes, prev, pager, next, jumper"
                    total={props.total}
                    onChange={(currentPage, pageSize) => ctx.emit("change", currentPage, pageSize)}
                />
            </div>
        )
    }
})

export default _default