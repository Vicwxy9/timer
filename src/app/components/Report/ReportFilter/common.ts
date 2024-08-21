import { StatQueryParam } from "@service/stat-service"
import { ReportFilterOption } from "../context"

export const cvtOption2Param = (filterOption: ReportFilterOption): StatQueryParam => ({
    host: filterOption.host,
    date: filterOption.dateRange,
    mergeHost: filterOption.mergeHost,
    mergeDate: filterOption.mergeDate,
    inclusiveRemote: filterOption.readRemote,
})