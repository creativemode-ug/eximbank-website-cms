import { Outlet } from "react-router-dom"
import LinkTabs, { type Tab } from "@/components/tab-controls/link-tabs"
import { IconCoin, IconExchange } from "@tabler/icons-react"

const tabs: Tab[] = [
    {
        name: "Exchange",
        path: "/foreign-exchange/exchange",
        regexPattern: "^/foreign-exchange/exchange*",
        icon: <IconExchange className="w-4 h-4 mr-2" />,
    },
    {
        name: "Currency",
        path: "/foreign-exchange/currency",
        regexPattern: "^/foreign-exchange/currency*",
        icon: <IconCoin className="w-4 h-4 mr-2" />,
    },
]

function ForeignExchangeLayout() {
    return (
        <div className="container space-y-10 py-10">
            <LinkTabs tabs={tabs} />
            <Outlet />
        </div>
    )
}

export default ForeignExchangeLayout
