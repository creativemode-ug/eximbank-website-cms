import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import { IconPlus } from "@tabler/icons-react"
import { useGetOfferCategories } from "@/features/offers/repositories/offer-categories"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import type { QueryOptions } from "@/types"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"
import { useEmptyState } from "@/components/empty-state"

import AccessGuard from "@/guards/access_guard"
import PageHeader from "@/components/page-header"
import Pagination from "@/components/pagination"
import Button from "@/components/Buttons/Button"
import Table from "@/components/Table/Table"
import Searchbox from "@/components/search-box"
import LocaleSwitch from "@/components/locale-switch"
import OfferCategoryColumns from "@/features/offers/fragments/offer-category-columns"
import OfferCategoryActions from "@/features/offers/fragments/offer-category-actions"

function OfferCategories() {
    const { paramState } = useSearchParamState<QueryOptions>({
        page: 1,
    })

    const { categories, isLoading } = useGetOfferCategories({ ...paramState })

    const createPermissions = getPermission(ContentType.Product, [
        Action.CREATE,
        Action.ALL,
    ])

    const emptyState = useEmptyState({
        title: "No Offer Categories Yet",
        description: `Create offer such as lifestyle, healthcare 
        shopping or travel to add structure and clarity to your catalog. 
        Use the Offer Category button at the top of the page`,
    })

    return (
        <Fragment>
            <Outlet />
            <PageHeader
                title="Offer Categories"
                description="Manage offer category information including, name, description etc"
            >
                <AccessGuard permissions={createPermissions}>
                    <Link to={"create"}>
                        <Button
                            type="button"
                            intent="primary"
                            leftIcon={<IconPlus size={16} />}
                        >
                            Offer Category
                        </Button>
                    </Link>
                </AccessGuard>
            </PageHeader>

            <div className="flex items-center justify-between gap-4">
                <Searchbox className="w-1/3" />
                <LocaleSwitch />
            </div>

            <Table
                columns={OfferCategoryColumns}
                data={categories?.data ?? []}
                isLoading={isLoading}
                hasSelection={false}
                hasActions={true}
                emptyState={emptyState}
                hasExpandableRow={true}
                actions={category => (
                    <OfferCategoryActions
                        category={category}
                        locale={paramState.locale ?? "en"}
                    />
                )}
            />

            <Pagination pageSize={10} totalCount={0} />
        </Fragment>
    )
}

export default OfferCategories
