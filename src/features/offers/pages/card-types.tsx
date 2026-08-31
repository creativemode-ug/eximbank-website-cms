import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import { IconPlus } from "@tabler/icons-react"
import { useGetCardTypes } from "@/features/offers/repositories/card-types"
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
// import LocaleSwitch from "@/components/locale-switch"
import CardTypeColumns from "@/features/offers/fragments/card-type-columns"
import CardTypeActions from "@/features/offers/fragments/card-type-actions"

function CardType() {
    const { paramState } = useSearchParamState<QueryOptions>({
        page: 1,
    })

    const { cardTypes, isLoading } = useGetCardTypes({ ...paramState })

    const createPermissions = getPermission(ContentType.Product, [
        Action.CREATE,
        Action.ALL,
    ])

    const emptyState = useEmptyState({
        title: "No Card Type Yet",
        description: `Create offer such as DEBIT or CREDIT to add structure 
        and clarity to your catalog. Use the card type button at 
        the top of the page`,
    })

    return (
        <Fragment>
            <Outlet />
            <PageHeader
                title="Card Type"
                description="Manage cart type information including, name, description etc"
            >
                <AccessGuard permissions={createPermissions}>
                    <Link to={"create"}>
                        <Button
                            type="button"
                            intent="primary"
                            leftIcon={<IconPlus size={16} />}
                        >
                            Card Type
                        </Button>
                    </Link>
                </AccessGuard>
            </PageHeader>

            <div className="flex items-center justify-between gap-4">
                <Searchbox className="w-1/3" />
                {/* <LocaleSwitch /> */}
            </div>

            <Table
                columns={CardTypeColumns}
                data={cardTypes?.data ?? []}
                isLoading={isLoading}
                hasSelection={false}
                hasActions={true}
                emptyState={emptyState}
                hasExpandableRow={true}
                actions={category => (
                    <CardTypeActions
                        cardType={category}
                        locale={paramState.locale ?? "en"}
                    />
                )}
            />

            <Pagination pageSize={10} totalCount={0} />
        </Fragment>
    )
}

export default CardType
