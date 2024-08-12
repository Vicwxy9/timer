/**
 * Copyright (c) 2021-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ElAside, ElContainer, ElHeader, ElScrollbar } from "element-plus"
import { defineComponent } from "vue"
import Menu from "./Menu"
import Nav from "./HeadNav"
import VersionTag from "./VersionTag"
import { RouterView } from "vue-router"

const _default = defineComponent(() => {
    return () => (
        <ElContainer class="app-layout">
            <ElHeader class="app-header">
                <Nav />
            </ElHeader>
            <ElContainer>
                <ElAside class="app-aside">
                    <ElScrollbar>
                        <Menu />
                    </ElScrollbar>
                </ElAside>
                <ElContainer class="app-container">
                    <RouterView />
                </ElContainer>
            </ElContainer>
            <VersionTag />
        </ElContainer>
    )
})

export default _default