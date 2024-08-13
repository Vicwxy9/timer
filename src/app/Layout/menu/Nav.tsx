/**
 * Copyright (c) 2024-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CloseBold, Menu } from "@element-plus/icons-vue"
import { ElBreadcrumb, ElBreadcrumbItem, ElIcon, ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu } from "element-plus"
import { defineComponent, onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { initTitle } from "./route"
import { MENUS } from "./item"
import { t } from "@app/locale"
import { classNames } from "@util/style"

const findMenuPath = (routePath: string): string[] => {
    return ['hahaah', 'aaas']
}

const _default = defineComponent(() => {
    const router = useRouter()
    const path = ref<string[]>([])
    const showMenu = ref(false)
    const openedGroups = ref(MENUS.map(m => m.index))

    const syncRouter = () => {
        const route = router.currentRoute.value
        route && (path.value = findMenuPath(route.path))
    }

    watch(router.currentRoute, syncRouter)

    onMounted(() => initTitle(router))

    return () => (
        <div class={classNames("nav-container", showMenu.value ? 'open' : 'close')}>
            <div class="nav-content">
                <ElBreadcrumb separator="/">
                    {path.value?.map(p => <ElBreadcrumbItem>{p}</ElBreadcrumbItem>)}
                </ElBreadcrumb>
                <div onClick={() => showMenu.value = !showMenu.value}>
                    <ElIcon size="large">
                        {showMenu.value ? <CloseBold /> : <Menu />}
                    </ElIcon>
                </div>
            </div>
            <div class={classNames("menu-wrapper", showMenu.value ? 'open' : 'close')}>
                <ElMenu
                    defaultOpeneds={openedGroups.value}
                    onOpen={index => openedGroups.value = [...openedGroups.value || [], index]}
                    onClose={index => openedGroups.value = openedGroups.value?.filter(v => v !== index)}
                >
                    {MENUS.map(({ title, children }, idx) => (
                        <ElSubMenu
                            index={`sub-${idx}`}
                            v-slots={{
                                title: () => t(title),
                                default: () => children?.map(item => <ElMenuItem>
                                    {
                                        t(item.title)
                                    }
                                </ElMenuItem>)
                            }}
                        />
                    ))}
                </ElMenu>
            </div>
        </div>
    )
})

export default _default