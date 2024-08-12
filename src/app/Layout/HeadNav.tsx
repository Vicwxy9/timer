import { ElBreadcrumb, ElDropdownMenu } from "element-plus"
import { defineComponent } from "vue"

const _default = defineComponent({
    setup() {
        return () => (
            <div class="nav-container">
                <ElBreadcrumb />
                <ElDropdownMenu>

                </ElDropdownMenu>
            </div>
        )
    }
})

export default _default