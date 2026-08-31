import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import { useGetOffers } from "@/features/offers/repositories/offers"
import { IconPlus } from "@tabler/icons-react"
import type { OfferOption } from "@/features/offers/types"
import { useSearchParamState } from "@/hooks/useSearchParamState"
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
import OfferColumns from "@/features/offers/fragments/offer-columns"
import OfferActions from "@/features/offers/fragments/offer-actions"

export default function Offers() {
    const { paramState } = useSearchParamState<OfferOption>({
        page: 1,
    })

    const { offers, isLoading } = useGetOffers({ ...paramState })

    const createPermissions = getPermission(ContentType.Product, [
        Action.CREATE,
        Action.ALL,
    ])

    const emptyState = useEmptyState({
        title: "No Offers Yet",
        description: `Create offers such as premium fitness, premium travel to 
            add structure and clarity to your catalog. Use the Offer button 
            at the top of the page`,
    })

    return (
        <Fragment>
            <Outlet />

            <PageHeader
                title="Offer"
                description="Manage offer information including, name, description, category, discounts etc"
            >
                <AccessGuard permissions={createPermissions}>
                    <Link to={"/offers-and-perks/offers/create"}>
                        <Button
                            type="button"
                            intent="primary"
                            leftIcon={<IconPlus size={16} />}
                        >
                            Offer
                        </Button>
                    </Link>
                </AccessGuard>
            </PageHeader>

            <div className="flex items-center justify-between gap-4">
                <Searchbox className="w-1/3" />
                <LocaleSwitch />
            </div>

            <Table
                columns={OfferColumns}
                data={offers?.data ?? []}
                isLoading={isLoading}
                hasSelection={false}
                hasActions={true}
                emptyState={emptyState}
                hasExpandableRow={true}
                actions={offer => (
                    <OfferActions
                        offer={offer}
                        locale={paramState.locale ?? "en"}
                    />
                )}
            />

            <Pagination pageSize={10} totalCount={offers?.meta.total ?? 0} />
        </Fragment>
    )
}
