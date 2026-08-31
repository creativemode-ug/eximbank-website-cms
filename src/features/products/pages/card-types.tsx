import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import { IconPlus } from "@tabler/icons-react"
import { useEmptyState } from "@/components/empty-state"
import { useGetCardTypes } from "@/features/products/repositories/card-types"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { QueryOptions } from "@/types"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"

import PageHeader from "@/components/page-header"
import AccessGuard from "@/guards/access_guard"
import Button from "@/components/Buttons/Button"
import Table from "@/components/Table/Table"
import Pagination from "@/components/pagination"
import CardTypeColumns from "@/features/products/fragments/card-types-columns"
import CardTypeActions from "@/features/products/fragments/card-types-actions"

function CardTypes() {
    const { paramState } = useSearchParamState<QueryOptions>({
        page: 1,
    })

    const { cardTypes, isLoading } = useGetCardTypes({ ...paramState })
    const createPermissions = getPermission(ContentType.Product, [
        Action.CREATE,
        Action.ALL,
    ])

    const emptyState = useEmptyState({
        title: "No Card Types Yet",
        description: `To create card type for a card product use the ➕ Card Type
            button at the top of the page`,
    })

    return (
        <Fragment>
            <Outlet />
            <PageHeader
                title="All Card Types"
                description="Manage all card types across products and product types"
            >
                <AccessGuard permissions={createPermissions}>
                    <Link to={"/services/card-types/create"}>
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

            <Table
                columns={CardTypeColumns}
                data={cardTypes?.data ?? []}
                isLoading={isLoading}
                hasSelection={false}
                hasActions={true}
                emptyState={emptyState}
                hasExpandableRow={false}
                actions={resource => (
                    <CardTypeActions
                        cardTypes={resource}
                        locale={paramState.locale ?? "en"}
                    />
                )}
            />

            <Pagination pageSize={10} totalCount={0} />
        </Fragment>
    )
}

export default CardTypes
