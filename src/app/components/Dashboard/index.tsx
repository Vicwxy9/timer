/**
 * Copyright (c) 2022 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { computed, defineComponent } from "vue"
import ContentContainer from "../common/ContentContainer"
import DashboardCard from './DashboardCard'
import "./style"
import { isTranslatingLocale, locale } from "@i18n"
import { ElRow } from "element-plus"
import Indicator from "./components/Indicator"
import MonthOnMonth from "./components/MonthOnMonth"
import TopKVisit from "./components/TopKVisit"
import Calendar from "./components/Calendar"
import { useRouter } from "vue-router"
import { useMediaSize, useRequest } from "@hooks"
import metaService from "@service/meta-service"
import { t } from "@app/locale"
import { REVIEW_PAGE } from "@util/constant/url"
import { useWindowSize } from "@vueuse/core"

const ROW_GUTTER = 15

const _default = defineComponent(() => {
    const router = useRouter()
    const jump2Help = () => router.push({ path: "/other/help" })
    const isNotEnOrZhCn = locale !== "en" && locale !== "zh_CN"
    const showHelp = isTranslatingLocale() || isNotEnOrZhCn
    const { data: showRate, refresh } = useRequest(metaService.recommendRate)

    const handleRate = async () => {
        await metaService.saveFlag("rateOpen")
        refresh()
    }

    const { width } = useWindowSize()
    const mediaSize = useMediaSize()
    const showCalendar = computed(() => {
        const ms = mediaSize.value
        // Not supported screens equals medium size or smaller
        return ms === 'lg' || ms === 'xl'
    })

    return () => (
        <ContentContainer class="dashboard-container">
            <ElRow gutter={ROW_GUTTER}>
                {width.value < 1400
                    ? <>
                        <DashboardCard span={width.value < 600 ? 24 : 8}>
                            <Indicator />
                        </DashboardCard>
                        <DashboardCard span={width.value < 600 ? 24 : 16}>
                            <TopKVisit />
                        </DashboardCard>
                        <DashboardCard span={24}>
                            <MonthOnMonth />
                        </DashboardCard>
                    </>
                    : <>
                        <DashboardCard span={4}>
                            <Indicator />
                        </DashboardCard>
                        <DashboardCard span={12}>
                            <MonthOnMonth />
                        </DashboardCard>
                        <DashboardCard span={8}>
                            <TopKVisit />
                        </DashboardCard>
                    </>}
                <DashboardCard v-show={showCalendar.value} span={24}>
                    <Calendar />
                </DashboardCard>
            </ElRow>
            <ElRow v-show={showHelp || showRate.value}>
                <span class="help-us-link" v-show={showRate.value}>
                    🌟 {t(msg => msg.about.text.greet)}&ensp;
                    <a href={REVIEW_PAGE} target="_blank" onClick={handleRate}>
                        {t(msg => msg.about.text.rate)}
                    </a>
                </span>
                <span class="help-us-link" v-show={!showRate.value} onClick={jump2Help}>
                    💡 Help us translate this extension/addon into your native language!
                </span>
            </ElRow>
        </ContentContainer>
    )
})

export default _default