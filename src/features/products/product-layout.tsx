import { Outlet } from "react-router-dom"
import LinkTabs, { type Tab } from "@/components/tab-controls/link-tabs"

import PageContainer from "@/components/page-container"

const tabs: Tab[] = [
    {
        name: "Products",
        path: "/services/products",
        regexPattern: "^/services/products*",
    },
    {
        name: "Categories",
        path: "/services/categories",
        regexPattern: "^/services/categories*",
    },
    {
        name: "Resources",
        path: "/services/resources",
        regexPattern: "^/services/resources*",
    },
    {
        name: "Card Types",
        path: "/services/card-types",
        regexPattern: "^/services/card-types*",
    },
]

function ProductLayout() {
    return (
        <PageContainer>
            <LinkTabs tabs={tabs} />
            <Outlet />
        </PageContainer>
    )
}

export default ProductLayout
