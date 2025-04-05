import { useDashboardModel } from "./dashboard.model"
import { DashboardView } from "./dashboard.view"

export const DashboardPage = () => {
    const methods = useDashboardModel()

    return <DashboardView {...methods} />
}