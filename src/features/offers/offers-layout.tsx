import { Outlet } from "react-router-dom"
import LinkTabs, { type Tab } from "@/components/tab-controls/link-tabs"

import PageContainer from "@/components/page-container"

const tabs: Tab[] = [
    {
        name: "Offers",
        path: "/offers-and-perks/offers",
        regexPattern: "^/offers-and-perks/offers*",
    },
    {
        name: "Categories",
        path: "/offers-and-perks/categories",
        regexPattern: "^/offers-and-perks/categories*",
    },
    {
        name: "Card Types",
        path: "/offers-and-perks/card-types",
        regexPattern: "^/offers-and-perks/card-types*",
    },
]

function OffersLayout() {
    return (
        <PageContainer>
            <LinkTabs tabs={tabs} />
            <Outlet />
        </PageContainer>
    )
}

export default OffersLayout
