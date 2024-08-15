
/**
 * Copyright (c) 2021-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { IconProps } from "element-plus"
import { Aim, Connection, HelpFilled, Histogram, Memo, MoreFilled, Rank, SetUp, Stopwatch, Timer, View } from "@element-plus/icons-vue"
import { getGuidePageUrl } from "@util/constant/url"
import Trend from "../icons/Trend"
import Table from "../icons/Table"
import Database from "../icons/Database"
import Whitelist from "../icons/Whitelist"
import Website from "../icons/Website"
import About from "../icons/About"
import { ANALYSIS_ROUTE, MERGE_ROUTE } from "@app/router/constants"
import { I18nKey } from "@app/locale"

export type MenuItem = {
    title: I18nKey
    icon: IconProps | string
    route?: string
    href?: string
    index?: string
}

export type MenuGroup = Omit<MenuItem, 'href' | 'route'> & {
    children: MenuItem[]
}

/**
 * Menu items
 */
export const MENUS: MenuGroup[] = [{
    title: msg => msg.menu.data,
    index: 'data',
    icon: Histogram,
    children: [{
        title: msg => msg.menu.dashboard,
        route: '/data/dashboard',
        icon: Stopwatch
    }, {
        title: msg => msg.menu.dataReport,
        route: '/data/report',
        icon: Table
    }, {
        title: msg => msg.menu.siteAnalysis,
        route: ANALYSIS_ROUTE,
        icon: Trend
    }, {
        title: msg => msg.menu.dataClear,
        route: '/data/manage',
        icon: Database
    }]
}, {
    title: msg => msg.menu.behavior,
    index: 'behavior',
    icon: View,
    children: [{
        title: msg => msg.menu.habit,
        route: '/behavior/habit',
        icon: Aim
    }, {
        title: msg => msg.menu.limit,
        route: '/behavior/limit',
        icon: Timer
    }]
}, {
    title: msg => msg.menu.additional,
    index: 'additional',
    icon: Connection,
    children: [{
        title: msg => msg.menu.siteManage,
        route: '/additional/site-manage',
        icon: Website
    }, {
        title: msg => msg.menu.whitelist,
        route: '/additional/whitelist',
        icon: Whitelist
    }, {
        title: msg => msg.menu.mergeRule,
        route: MERGE_ROUTE,
        icon: Rank
    }, {
        title: msg => msg.menu.option,
        route: '/additional/option',
        icon: SetUp
    }]
}, {
    title: msg => msg.menu.other,
    index: 'other',
    icon: MoreFilled,
    children: [{
        title: msg => msg.base.guidePage,
        href: getGuidePageUrl(),
        icon: Memo,
        index: '_guide',
    }, {
        title: msg => msg.menu.helpUs,
        route: '/other/help',
        icon: HelpFilled,
    }, {
        title: msg => msg.menu.about,
        route: '/other/about',
        icon: About,
    }]
}]
