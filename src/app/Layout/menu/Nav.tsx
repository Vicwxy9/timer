import { InfoFilled } from "@element-plus/icons-vue"
import { ElBreadcrumb, ElDropdown, ElDropdownMenu, ElIcon } from "element-plus"
import { defineComponent } from "vue"

const _default = defineComponent({
    setup() {
        return () => (
            <div class="nav-container">
                <ElBreadcrumb />
                <ElDropdown v-slots={{
                    default: () => (
                        <ElIcon>
                            <InfoFilled />
                        </ElIcon>
                    ),
                    dropdown: () => (
                        <ElDropdownMenu>

                        </ElDropdownMenu>
                    )
                }}>
                </ElDropdown>
            </div>
        )
    }
})

export default _default