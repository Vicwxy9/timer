/**
 * Copyright (c) 2024-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CloseBold, Link, Menu } from "@element-plus/icons-vue"
import { ElBreadcrumb, ElBreadcrumbItem, ElIcon, ElMenu, ElMenuItem, ElSubMenu } from "element-plus"
import { defineComponent, h, onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { handleClick, initTitle } from "./route"
import { MENUS } from "./item"
import { t } from "@app/locale"
import { classNames } from "@util/style"
import { getUrl } from "@api/chrome/runtime"
import { useSwitch } from "@hooks"

const generateBreadcrumbMap = (): { [path: string]: [groupTitle: string, menuTitle: string] } => {
    const result = {}
    MENUS.forEach(({ title: groupTitle, children }) => {
        children.filter(m => m.route).forEach(({ route, title: menuTitle }) => {
            result[route] = [t(groupTitle), t(menuTitle)]
        })
    })
    return result
}

const BREADCRUMB_PATH = generateBreadcrumbMap()

const findMenuPath = (routePath: string): string[] => {
    return BREADCRUMB_PATH[routePath] || []
}

const _default = defineComponent(() => {
    const router = useRouter()
    const path = ref<string[]>([])
    const [showMenu, , closeMenu, toggleMenu] = useSwitch(false)
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
                <div class="bread-wrapper">
                    <ElIcon>
                        <img width='32' height='32' src={getUrl('static/images/icon.png')} />
                    </ElIcon>
                    <ElBreadcrumb separator="/">
                        {path.value?.map(p => <ElBreadcrumbItem>{p}</ElBreadcrumbItem>)}
                    </ElBreadcrumb>
                </div>
                <div onClick={toggleMenu}>
                    <ElIcon size="large">
                        {showMenu.value ? <CloseBold /> : <Menu />}
                    </ElIcon>
                </div>
            </div>
            {!!showMenu.value && (
                <div class="menu-wrapper">
                    <ElMenu
                        defaultOpeneds={openedGroups.value}
                        onOpen={index => openedGroups.value = [...openedGroups.value || [], index]}
                        onClose={index => openedGroups.value = openedGroups.value?.filter(v => v !== index)}
                        onSelect={closeMenu}
                    >
                        {MENUS.map(({ title, children, icon }, idx) => (
                            <ElSubMenu
                                index={`sub-${idx}`}
                                v-slots={{
                                    title: () => <>
                                        <ElIcon size={15}>{h(icon)}</ElIcon>
                                        <span>{t(title)}</span>
                                    </>,
                                    default: () => children?.map(item => (
                                        <ElMenuItem
                                            onClick={() => {
                                                handleClick(item, router)
                                                closeMenu()
                                            }}
                                        >
                                            <span>{t(item.title)}</span>
                                            {!!item.href && <ElIcon size={12}><Link /></ElIcon>}
                                        </ElMenuItem>
                                    ))
                                }}
                            />
                        ))}
                    </ElMenu>
                </div>
            )}
        </div>
    )
})

export default _default