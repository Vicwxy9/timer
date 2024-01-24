/**
 * Copyright (c) 2021 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Download } from "@element-plus/icons-vue"
import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from "element-plus"
import { defineComponent } from "vue"

const ALL_FILE_FORMATS: FileFormat[] = ["json", "csv"]

const renderDropdown = (onMenuClick: (f: FileFormat) => void) => (
    <ElDropdownMenu>
        {ALL_FILE_FORMATS.map(
            format => (
                <ElDropdownItem onClick={() => onMenuClick(format)}>
                    {format}
                </ElDropdownItem>
            )
        )}
    </ElDropdownMenu>
)

const _default = defineComponent({
    emits: {
        download: (_format: FileFormat) => true,
    },
    setup(_, ctx) {
        return () => (
            <ElDropdown
                class="export-dropdown"
                showTimeout={100}
                v-slots={{ dropdown: () => renderDropdown(f => ctx.emit("download", f)) }}
            >
                <ElButton size="small" class="export-dropdown-button">
                    <ElIcon size={17} style={{ padding: "0 1px" }}>
                        <Download />
                    </ElIcon>
                </ElButton>
            </ElDropdown>
        )
    }
})

export default _default